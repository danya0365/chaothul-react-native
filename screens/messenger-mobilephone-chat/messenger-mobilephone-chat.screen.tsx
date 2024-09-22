import FocusAwareStatusBarAuto from "@/components/atoms/focus-aware-status-bar-auto";
import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { TopNavigationView } from "@/components/molecules/top-navigation.view";
import MessengerMobilephoneChatLoginLayout from "@/layouts/messenger-mobilephone-chat/messenger-mobilephone-chat-login.layout";
import MessengerMobilephoneChatLayout from "@/layouts/messenger-mobilephone-chat/messenger-mobilephone-chat.layout";
import { UseAppDispatch, useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setChannelId,
  setTelephone,
} from "@/store/reducer/messenger-mobilephone-reducer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Divider,
  Layout,
  StyleService,
  TopNavigationAction,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  dispatch?: UseAppDispatch;
};

export default (props: Props): React.ReactElement => {
  const { dispatch = useAppDispatch() } = props;
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const { telephone } = useAppSelector((state) => state.messengerMobilephone);
  const insetsConfig = useSafeAreaInsets();
  const backgroundColor: string = theme[`navigation-bar-background`];
  const iconColor = theme["text-basic-color"];

  const renderBackAction = (): React.ReactElement => {
    if (!router.canGoBack()) {
      return (
        <TopNavigationAction
          icon={<ArrowIosBackIcon fill={iconColor} />}
          onPress={() => {
            router.navigate("/home");
          }}
        />
      );
    }
    return (
      <TopNavigationAction
        icon={<ArrowIosBackIcon fill={iconColor} />}
        onPress={router.back}
      />
    );
  };

  const renderRightAction = (): React.ReactElement => {
    if (!telephone) {
      return <></>;
    }
    return (
      <Pressable
        onPress={() => {
          dispatch(setTelephone(null));
          dispatch(setChannelId(null));
        }}
      >
        {({ pressed }) => (
          <FontAwesome
            name="sign-out"
            size={25}
            color={theme["text-control-color"]}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    );
  };

  return (
    <Layout
      style={{
        ...styles.safeArea,
        paddingTop: insetsConfig.top,
        paddingBottom: insetsConfig.bottom,
        backgroundColor: backgroundColor,
      }}
    >
      <FocusAwareStatusBarAuto />
      <TopNavigationView
        textTitle={`ติดต่อเจ้าหน้าที่`}
        accessoryRight={renderRightAction}
        accessoryLeft={renderBackAction}
      />
      <Divider />
      {telephone ? (
        <MessengerMobilephoneChatLayout />
      ) : (
        <MessengerMobilephoneChatLoginLayout />
      )}
    </Layout>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
});
