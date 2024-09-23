import LoadingView from "@/components/organisms/loading.view";
import { UserNotification } from "@/models/user-notification.model";
import { List, StyleService, useStyleSheet } from "@ui-kitten/components";
import { useNavigation } from "expo-router";
import React from "react";
import { ListRenderItemInfo, RefreshControl } from "react-native";
import { MeApiService } from "../../services/api.service";
import httpRequest from "../../services/http-request.service";
import { NotificationItem } from "./extra/notification-item.component";

export default (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const [notifications, setNotifications] = React.useState<UserNotification[]>(
    []
  );
  const meApiService = new MeApiService(httpRequest);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const renderItem = (
    info: ListRenderItemInfo<UserNotification>
  ): React.ReactElement => (
    <NotificationItem style={styles.item} userNotification={info.item} />
  );

  const doRequestNotifications = async (callback: any) => {
    setIsLoading(true);
    try {
      const response = await meApiService.getNotifications(1);
      const apiNotifications = response.data.map((notifications) =>
        UserNotification.createFromApi(notifications)
      );
      setNotifications(apiNotifications);
      callback();
      setIsLoading(false);
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.log(error.response.data);
        const data = error.response.data;
      } else {
        console.error(error);
      }
      callback();
      setIsLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    doRequestNotifications(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    doRequestNotifications(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      doRequestNotifications(() => {
        setRefreshing(false);
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <List
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.list}
        data={notifications}
        renderItem={renderItem}
      />
      {isLoading && <LoadingView />}
    </>
  );
};

const themedStyles = StyleService.create({
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-3",
  },
});
