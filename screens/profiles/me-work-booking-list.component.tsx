import React from "react";
import {
  Divider,
  Text,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import MeWorkBookingList from "../../layouts/me-work-booking-list";
import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { useNavigation } from "expo-router";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";

export const MeWorkBookingListScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation
        title={`รายการจองรับงาน`}
        accessoryLeft={renderBackAction}
      />
      <Divider />
      <MeWorkBookingList />
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
