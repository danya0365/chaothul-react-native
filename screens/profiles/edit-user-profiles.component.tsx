import React from "react";
import {
  Divider,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import EditUserProfile from "../../layouts/edit-user-profile";
import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { useNavigation } from "expo-router";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";

export const EditUserProfileScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation
        title={`Edit User profile`}
        accessoryLeft={renderBackAction}
      />
      <Divider />
      <EditUserProfile />
    </SafeAreaLayoutView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
});
