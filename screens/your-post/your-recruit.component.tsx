import React from "react";
import {
  Divider,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import YourRecruit from "../../layouts/your-recruit";
import { useNavigation } from "expo-router";
import useAuth from "@/hooks/auth";
import { ArrowIosBackIcon, FileAddOutlineIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import LoginRequireComponent from "@/components/organisms/login-require.component";
import { router } from "expo-router";

export const YourRecruitScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { user } = useAuth();
  const [isCanCreateRecruit, setIsCanCreateRecruit] = React.useState(false);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const renderNewWorkAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={FileAddOutlineIcon}
      onPress={() => {
        if (user?.isPermission("create_recruit")) {
          // TODO:
          router.push("/todo");
          //navigation.navigate("New Recruit Screen");
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
        title={`ประกาศหางาน`}
        accessoryLeft={renderBackAction}
        accessoryRight={renderNewWorkAction}
      />
      <Divider />
      {!user ? <LoginRequireComponent /> : <YourRecruit />}
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
