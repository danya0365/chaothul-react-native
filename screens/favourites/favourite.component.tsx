import React from "react";
import {
  Divider,
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import FavouriteWork from "../../layouts/favourite-work";
import { useAppSelector } from "@/store/hooks";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import LoginRequireComponent from "@/components/organisms/login-require.component";

export const FavouriteScreen = (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const { token } = useAppSelector((state) => state.auth);
  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title={`รายการที่ถูกใจ`} />
      <Divider />
      {!token ? <LoginRequireComponent /> : <FavouriteWork />}
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
