import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import LoginRequireComponent from "@/components/organisms/login-require.component";
import useAuth from "@/hooks/auth";
import {
    Divider,
    StyleService,
    TopNavigation,
    TopNavigationAction,
    useStyleSheet,
} from "@ui-kitten/components";
import { useNavigation } from "expo-router";
import React from "react";
import MyReviews from "../../layouts/my-reviews";

export const MyReviewsScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { user } = useAuth();

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title="รีวิวของฉัน" accessoryLeft={renderBackAction} />
      <Divider />
      {!user ? <LoginRequireComponent /> : <MyReviews />}
    </SafeAreaLayoutView>
  );
};

const themedStyles = StyleService.create({
  safeArea: { flex: 1 },
});
