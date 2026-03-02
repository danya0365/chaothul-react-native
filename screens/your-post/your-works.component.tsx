import { ArrowIosBackIcon, FileAddOutlineIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import LoginRequireComponent from "@/components/organisms/login-require.component";
import useAuth from "@/hooks/auth";
import {
  Divider,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import { router, useNavigation } from "expo-router";
import React from "react";
import YourWork from "../../layouts/your-works";

export const YourWorkScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { user } = useAuth();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const renderNewWorkAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={FileAddOutlineIcon}
      onPress={() => {
        if (user?.isPermission("create_work")) {
          router.push("/new-work");
        } else {
          router.push("/payment");
        }
      }}
    />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation
        title={`ประกาศรับงานของคุณ`}
        accessoryLeft={renderBackAction}
        accessoryRight={renderNewWorkAction}
      />
      <Divider />
      {!user ? <LoginRequireComponent /> : <YourWork />}
    </SafeAreaLayoutView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
