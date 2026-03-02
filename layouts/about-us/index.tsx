import React from "react";
import { ScrollView } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { LabelValue } from "./extra/label-value.component";
import { AppInfoService } from "../../services/app-info.service.expo";

export default ({ navigation }: { navigation: any }): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <LabelValue
        style={styles.profileSetting}
        hint="App Name"
        value={AppInfoService.getName()}
      />
      <LabelValue
        style={styles.profileSetting}
        hint="Version"
        value={AppInfoService.getVersion()}
      />
      <LabelValue
        style={[styles.profileSetting, styles.section]}
        hint="Environment"
        value={AppInfoService.getAppEnvironment()}
      />
      <LabelValue
        style={styles.profileSetting}
        hint="Api Url"
        value={AppInfoService.getApiUrl()}
      />
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
