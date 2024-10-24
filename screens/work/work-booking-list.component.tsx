import React from "react";
import {
  Divider,
  Text,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import WorkBookingList from "../../layouts/work-booking-list";
import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import { useLocalSearchParams, useNavigation } from "expo-router";

export const WorkBookingListScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { id: workId } = useLocalSearchParams<{ id: string }>();
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation
        title={`รายการจองทั้งหมด`}
        accessoryLeft={renderBackAction}
      />
      <Divider />
      <WorkBookingList workId={Number(workId)} />
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
