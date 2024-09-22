import React from "react";
import { StyleSheet } from "react-native";
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { UserProfile } from "@/models/user-profile";
import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import LoadingView from "@/components/organisms/loading.view";

export const UserProfileScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): React.ReactElement => {
  const { userId } = route.params;

  const [userProfile, setUserProfile] = React.useState<UserProfile>();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("UserProfileScreen");
  }, []);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.container} insets="top">
      {userProfile && (
        <>
          <TopNavigation
            title={userProfile.fullName}
            accessoryLeft={renderBackAction}
          />
          <Divider />
        </>
      )}
      {!userProfile && (
        <>
          <TopNavigation
            title={`กำลังโหลด...`}
            accessoryLeft={renderBackAction}
          />
          <Divider />
        </>
      )}
      {isLoading && <LoadingView />}
    </SafeAreaLayoutView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
