import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import LoginRequireComponent from "@/components/organisms/login-require.component";
import { MenuGridList } from "@/components/organisms/menu-grid-list.component";
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
import { youOrOtherRecruitData } from "./data";

export const SelectYourOrOtherRecruitScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { user } = useAuth();

  const onItemPress = (index: number): void => {
    router.push(youOrOtherRecruitData[index].route);
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title={`โพสท์หางาน`} accessoryLeft={renderBackAction} />
      <Divider />
      {!user ? (
        <LoginRequireComponent />
      ) : (
        <MenuGridList data={youOrOtherRecruitData} onItemPress={onItemPress} />
      )}
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
