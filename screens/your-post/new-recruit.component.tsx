import React from "react";
import {
  Divider,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import NewRecruit from "../../layouts/new-recruit";
import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { useNavigation } from "expo-router";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";

export const NewRecruitScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const onRecruitCreated = async () => {
    navigation && navigation.goBack();
  };

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation
        title={`ประกาศหางานใหม่`}
        accessoryLeft={renderBackAction}
      />
      <Divider />
      <NewRecruit onRecruitCreated={onRecruitCreated} />
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
