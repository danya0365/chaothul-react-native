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
import CreateRecruitReview from "../../layouts/create-recruit-review";

export const CreateRecruitReviewScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { id: recruitId } = useLocalSearchParams<{ id: string }>();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title="เขียนรีวิว" accessoryLeft={renderBackAction} />
      <Divider />
      <CreateRecruitReview recruitId={Number(recruitId)} />
    </SafeAreaLayoutView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
});
