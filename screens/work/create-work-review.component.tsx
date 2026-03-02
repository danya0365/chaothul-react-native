import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import {
    Divider,
    StyleService,
    TopNavigation,
    TopNavigationAction,
    useStyleSheet,
} from "@ui-kitten/components";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";
import CreateWorkReview from "../../layouts/create-work-review";

export const CreateWorkReviewScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { id: workId } = useLocalSearchParams<{ id: string }>();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title="เขียนรีวิว" accessoryLeft={renderBackAction} />
      <Divider />
      <CreateWorkReview workId={Number(workId)} />
    </SafeAreaLayoutView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
});
