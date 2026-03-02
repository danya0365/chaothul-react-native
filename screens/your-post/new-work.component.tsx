import React from "react";
import {
  Divider,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import NewWork from "../../layouts/new-work";
import { useNavigation } from "expo-router";
import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";

export const NewWorkScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const onWorkCreated = async () => {
    navigation && navigation.goBack();
  };

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title={`ประกาศงานใหม่`} accessoryLeft={renderBackAction} />
      <Divider />
      <NewWork onWorkCreated={onWorkCreated} />
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
