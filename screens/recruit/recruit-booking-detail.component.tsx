import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import RecruitBookingDetail from "@/layouts/recruit-booking-detail";
import {
  Divider,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";

export const RecruitBookingDetailScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { id: recruitBookingId } = useLocalSearchParams<{ id: string }>();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation
        title={`รายละเอียดการจอง`}
        accessoryLeft={renderBackAction}
      />
      <Divider />
      <RecruitBookingDetail recruitBookingId={Number(recruitBookingId)} />
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
