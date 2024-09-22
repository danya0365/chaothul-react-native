import React from "react";
import { ScrollView } from "react-native";
import { Button, StyleService, useStyleSheet } from "@ui-kitten/components";
import { ProfileAvatar } from "./extra/profile-avatar.component";
import { ProfileSetting } from "./extra/profile-setting.component";
import { CameraIcon } from "./extra/icons";
import { Profile } from "../profile-menu/extra/data";
import { router } from "expo-router";

const profile: Profile = Profile.helenKuper();

type Props = {};

export default (props: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);

  const onDoneButtonPress = (): void => {
    router.back();
  };

  const renderPhotoButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status="basic"
      accessoryLeft={CameraIcon}
    />
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ProfileAvatar
        style={styles.profileAvatar as any}
        source={profile.photo}
        editButton={renderPhotoButton}
      />
      <ProfileSetting
        style={[styles.profileSetting, styles.section]}
        hint="First Name"
        value={profile.firstName}
      />
      <ProfileSetting
        style={styles.profileSetting}
        hint="Last Name"
        value={profile.lastName}
      />
      <Button style={styles.doneButton} onPress={onDoneButtonPress}>
        DONE
      </Button>
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
  contentContainer: {
    paddingVertical: 24,
  },
  profileAvatar: {
    aspectRatio: 1.0,
    height: 124,
    alignSelf: "center",
  },
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
});
