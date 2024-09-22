import React from "react";
import {
  Divider,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import Login from "../../layouts/login";
import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { useNavigation } from "expo-router";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";

export const LoginScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title={`เข้าสู่ระบบ`} accessoryLeft={renderBackAction} />
      <Divider />
      <Login />
    </SafeAreaLayoutView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
});
