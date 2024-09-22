import React from "react";
import {
  Divider,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import YourWork from "../../layouts/your-work";
import useAuth from "@/hooks/auth";
import { ArrowIosBackIcon, FileAddOutlineIcon } from "@/components/atoms/icons";
import { useNavigation } from "expo-router";
import LoginRequireComponent from "@/components/organisms/login-require.component";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import { router } from "expo-router";

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
          // TODO:
          router.push("/todo");
          //navigation.navigate("New Work Screen");
        } else {
          // TODO:
          router.push("/todo");
          //navigation.navigate("Payment Screen");
        }
      }}
    />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation
        title={`ประกาศรับงาน`}
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
