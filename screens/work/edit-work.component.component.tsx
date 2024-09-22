import React from "react";
import {
  Divider,
  Layout,
  StyleService,
  Text,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import { ArrowIosBackIcon } from "@/components/atoms/icons";

export const EditWorkScreen = ({
  navigation,
}: {
  navigation: any;
}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title={`เกี่ยวกับแอพ`} accessoryLeft={renderBackAction} />
      <Divider />
      <Layout style={styles.container}>
        <Text>แก้ไขงาน</Text>
      </Layout>
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
