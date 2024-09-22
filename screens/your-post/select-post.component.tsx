import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import LoginRequireComponent from "@/components/organisms/login-require.component";
import { MenuGridList } from "@/components/organisms/menu-grid-list.component";
import { useAppSelector } from "@/store/hooks";
import {
  Divider,
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import React from "react";
import { data } from "./data";
import { router } from "expo-router";

export const SelectPostScreen = (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const { token } = useAppSelector((state) => state.auth);

  const onItemPress = (index: number): void => {
    // TODO:
    router.push("/todo");
    //navigation.navigate(data[index].route);
  };

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title={`โพสท์รับงานหรือหางาน`} />
      <Divider />
      {!token ? (
        <LoginRequireComponent />
      ) : (
        <MenuGridList data={data} onItemPress={onItemPress} />
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
