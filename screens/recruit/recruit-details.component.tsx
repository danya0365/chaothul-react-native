import { ArrowIosBackIcon, EditIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import useAuth from "@/hooks/auth";
import { Recruit } from "@/models/recruit.model";
import {
  Divider,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";
import RecruitDetails from "../../layouts/recruit-details";

export const RecruitDetailsScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { user } = useAuth();
  const { id: recruitId } = useLocalSearchParams<{ id: string }>();

  const [isCanManageRecruit, setIsCanManageRecruit] = React.useState(false);

  const renderEditAction = (): React.ReactElement => {
    if (!isCanManageRecruit) return <></>;
    return (
      <TopNavigationAction
        icon={ArrowIosBackIcon}
        onPress={navigation.goBack}
      />
    );
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={EditIcon}
      onPress={() => {
        console.log("แก้ไขการรับงาน");
      }}
    />
  );

  const onRecruitInfoReady = (recruitInfo: Recruit) => {
    if (recruitInfo?.author?.id == user?.id) {
      setIsCanManageRecruit(true);
    } else {
      setIsCanManageRecruit(false);
    }
  };

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation
        title={`รายละเอียดงานที่ต้องการ`}
        accessoryLeft={renderBackAction}
        accessoryRight={renderEditAction}
      />
      <Divider />
      <RecruitDetails
        recruitId={Number(recruitId)}
        onRecruitInfoReady={onRecruitInfoReady}
      />
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
