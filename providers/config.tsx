import FullLoadingView from "@/components/organisms/full-loading.view";
import useAuth from "@/hooks/auth";
import { AppConfig } from "@/models/app-config";
import { Json } from "@/models/json";
import { MessengerConversation } from "@/models/messenger-conversation";
import { Notification } from "@/models/notification";
import {
  ConfigurationApiService,
  MessengerApiService,
  NotificationApiService,
} from "@/services/api.service";
import { UseAppDispatch, useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setConfig,
  setIsNewNotification,
  setLastNotificationUpdate,
} from "@/store/reducer/app-reducer";
import {
  setChannelId,
  setIsNewMessenger,
  setLastConversationSeen,
} from "@/store/reducer/messenger-reducer";
import React, { useEffect, useState } from "react";

type Props = {
  children?: React.ReactNode;
  configurationApiService?: ConfigurationApiService;
  notificationApiService?: NotificationApiService;
  messengerApiService?: MessengerApiService;
  dispatch?: UseAppDispatch;
};
const ConfigProvider: React.FC<Props> = (props) => {
  const { token } = useAuth();
  const { lastNotificationUpdate } = useAppSelector((state) => state.app);
  const { lastConversationSeen, channelId } = useAppSelector(
    (state) => state.messenger
  );
  const {
    children,
    configurationApiService = new ConfigurationApiService(),
    notificationApiService = new NotificationApiService(),
    messengerApiService = new MessengerApiService(),
    dispatch = useAppDispatch(),
  } = props;

  const [loading, setLoading] = useState(false);

  const getConfigurations = async () => {
    try {
      const response = await configurationApiService.getConfigurations();
      if (response.status) {
        const data = AppConfig.createFromDB(response.data);
        dispatch(setConfig(data));
      }
    } catch (error) {
      console.log("getConfigurations error:", error);
    }
  };

  const getLastConversationSeen = async (params: { channelId: number }) => {
    try {
      const response = await messengerApiService.getLastConversationSeen(
        params
      );
      if (response.status) {
        const conversation = MessengerConversation.createFromApi(response.data);
        dispatch(setLastConversationSeen(conversation));

        if (conversation.id != lastConversationSeen?.id) {
          dispatch(setIsNewMessenger(true));
        }
      }
    } catch (error) {
      console.log("getLastConversationSeen error:", error);
    }
  };

  const getOrCreateNewChannel = async () => {
    try {
      const response = await messengerApiService.getOrCreateNewChannel();

      if (response.status) {
        const data = response.data as Json;
        const channelId = data.id;

        dispatch(setChannelId(channelId));
      }
    } catch (error) {
      console.log("getOrCreateNewChannel error:", error);
    }
  };

  const getLastUpdateNotification = async () => {
    try {
      const response = await notificationApiService.getLastUpdateNotification();
      if (response.status) {
        const notification = Notification.createFromApi(response.data);
        dispatch(setLastNotificationUpdate(notification.updatedAt));

        if (notification.updatedAt != lastNotificationUpdate) {
          dispatch(setIsNewNotification(true));
        }
      }
    } catch (error) {
      console.log("getLastUpdateNotification error:", error);
    }
  };

  const getApiData = async () => {
    setLoading(true);
    const promises = [getConfigurations(), getLastUpdateNotification()];
    try {
      await Promise.all(promises);
    } catch (error) {
      console.log("Promise error");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!token) return;
    if (!channelId) {
      getOrCreateNewChannel();
    } else {
      getLastConversationSeen({ channelId });
    }
  }, [channelId, token]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (channelId) getLastConversationSeen({ channelId });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [channelId, lastConversationSeen]);

  useEffect(() => {
    getApiData();
  }, []);

  if (loading) {
    return <FullLoadingView />;
  }

  return children;
};

export default ConfigProvider;
