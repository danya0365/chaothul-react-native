import { ArrowIosBackIcon } from "@/components/atoms/icons";
import SetPinCodeLayout from "@/layouts/set-pin-code/set-pin-code.layout";
import {
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import SetPinCodeSafeAreaLayoutView from "./set-pin-code-safe-area-layout.view";

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
    <SetPinCodeSafeAreaLayoutView style={styles.safeArea}>
      <TopNavigation
        title={""}
        appearance="control"
        style={{ backgroundColor: "transparent" }}
        accessoryLeft={renderBackAction}
      />
      <SetPinCodeLayout />
    </SetPinCodeSafeAreaLayoutView>
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
