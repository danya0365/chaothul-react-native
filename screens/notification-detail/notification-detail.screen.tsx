import FocusAwareStatusBarAuto from "@/components/atoms/focus-aware-status-bar-auto";
import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import TopNavigationTransparentView from "@/components/molecules/top-navigation-transparent.view";
import NotificationDetailLayout from "@/layouts/notification-detail/notification-detail.layout";
import {
  StyleService,
  TopNavigationAction,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
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
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <FocusAwareStatusBarAuto />
      <TopNavigationTransparentView
        textTitle={`รายละเอียดประกาศ`}
        accessoryLeft={renderBackAction}
      />
      <NotificationDetailLayout />
    </SafeAreaLayoutView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
  iconButton: {
    aspectRatio: 1.0,
    height: 24,
  },
});
