import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import CreateRecruitBooking from "@/layouts/create-recruit-booking";
import {
  Divider,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";

export const CreateRecruitBookingScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { id: recruitId } = useLocalSearchParams<{ id: string }>();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title={`ทำการจอง`} accessoryLeft={renderBackAction} />
      <Divider />
      <CreateRecruitBooking recruitId={Number(recruitId)} />
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
