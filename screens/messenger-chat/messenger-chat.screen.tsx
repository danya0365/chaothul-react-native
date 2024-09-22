import FocusAwareStatusBarAuto from "@/components/atoms/focus-aware-status-bar-auto";
import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { TopNavigationView } from "@/components/molecules/top-navigation.view";
import MessengerChatLayout from "@/layouts/messenger-chat/messenger-chat.layout";
import { UseAppDispatch, useAppDispatch } from "@/store/hooks";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  dispatch?: UseAppDispatch;
};

export default (props: Props): React.ReactElement => {
  const { dispatch = useAppDispatch() } = props;
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
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
        accessoryLeft={renderBackAction}
      />
      <Divider />
      <MessengerChatLayout />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
});
