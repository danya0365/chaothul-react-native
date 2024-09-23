import React from "react";
import {
  Divider,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import WorkDetails from "../../layouts/work-details";
import { useLocalSearchParams, useNavigation } from "expo-router";
import useAuth from "@/hooks/auth";
import { ArrowIosBackIcon, EditIcon } from "@/components/atoms/icons";
import { Work } from "@/models/work.model";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";

export const WorkDetailScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { user } = useAuth();
  const { id: workId } = useLocalSearchParams<{ id: string }>();

  const [isCanManageWork, setIsCanManageWork] = React.useState(false);

  const renderBackAction = (): React.ReactElement => {
    return (
      <TopNavigationAction
        icon={ArrowIosBackIcon}
        onPress={navigation.goBack}
      />
    );
  };

  const renderEditAction = (): React.ReactElement => {
    if (!isCanManageWork) return <></>;
    return (
      <TopNavigationAction
        icon={EditIcon}
        onPress={() => {
          console.log("แก้ไขการรับงาน");
        }}
      />
    );
  };

  const onWorkInfoReady = (workInfo: Work) => {
    if (workInfo?.author?.id == user?.id) {
      setIsCanManageWork(true);
    } else {
      setIsCanManageWork(false);
    }
  };

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation
        title={`รายละเอียดงาน`}
        accessoryLeft={renderBackAction}
        accessoryRight={renderEditAction}
      />
      <Divider />
      <WorkDetails workId={Number(workId)} onWorkInfoReady={onWorkInfoReady} />
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
