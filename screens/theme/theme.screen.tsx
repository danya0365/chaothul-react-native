import FocusAwareStatusBarAuto from "@/components/atoms/focus-aware-status-bar-auto";
import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import TopNavigationTransparentView from "@/components/molecules/top-navigation-transparent.view";
import ThemeLayout from "@/layouts/theme/theme.layout";
import { Divider, TopNavigationAction, useTheme } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default (): React.ReactElement => {
  const router = useRouter();
  const theme = useTheme();
  const iconColor = theme["text-basic-color"];

  const renderBackAction = (): React.ReactElement => {
    if (!router.canGoBack()) {
      return (
        <TopNavigationAction
          icon={<ArrowIosBackIcon fill={iconColor} />}
          onPress={() => {
            router.navigate("/");
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
        textTitle={`เลือกธีม`}
        accessoryLeft={renderBackAction}
      />
      <Divider />
      <ThemeLayout />
    </SafeAreaLayoutView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
