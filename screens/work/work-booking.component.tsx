import React from "react";
import {
  Divider,
  Text,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import WorkBooking from "../../layouts/work-booking";
import useAuth from "@/hooks/auth";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import { WorkApiService } from "@/services/api.service";
import httpRequest from "@/services/http-request.service";

export const WorkBookingsScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const workApiService = new WorkApiService(httpRequest);
  const { user } = useAuth();
  const { id: workId } = useLocalSearchParams<{ id: string }>();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title={`ทำการจอง`} accessoryLeft={renderBackAction} />
      <Divider />
      <WorkBooking workId={Number(workId)} />
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
