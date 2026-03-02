import React from "react";
import {
  Divider,
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import ProfileMenu from "../../layouts/profile-menu";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";

export const ProfileMenuScreen = (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title={`โปรไฟล์`} />
      <Divider />
      <ProfileMenu />
    </SafeAreaLayoutView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
});
