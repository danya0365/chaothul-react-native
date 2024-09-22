import { ArrowIosBackIcon } from "@/components/atoms/icons";
import LoginPinCodeLayout from "@/layouts/login-pin-code/login-pin-code.layout";
import {
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import LoginPinCodeSafeAreaLayoutView from "./login-pin-code-safe-area-layout.view";

type Props = {};

export default (_: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const iconColor = theme["text-control-color"];

  const renderBackAction = (): React.ReactElement => {
    if (!router.canGoBack()) {
      return <></>;
    }
    return (
      <TopNavigationAction
        icon={<ArrowIosBackIcon fill={iconColor} />}
        onPress={router.back}
      />
    );
  };

  return (
    <LoginPinCodeSafeAreaLayoutView style={styles.safeArea}>
      <TopNavigation
        title={""}
        appearance="control"
        style={{ backgroundColor: "transparent" }}
        accessoryLeft={renderBackAction}
      />
      <LoginPinCodeLayout />
    </LoginPinCodeSafeAreaLayoutView>
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
  title: {
    color: "text-control-color",
  },
});
