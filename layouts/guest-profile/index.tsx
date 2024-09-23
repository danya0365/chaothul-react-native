import React from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { router } from "expo-router";
import { LockOutlineIcon } from "@/components/atoms/icons";

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);

  const onLoginButtonPress = (): void => {
    router.push("/auth/login");
  };

  const onRegisterButtonPress = (): void => {
    router.push("/auth/register");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <LockOutlineIcon style={styles.profileAvatar} fill="#8F9BB3" />
        <Text style={styles.guestTitle} category="h5">
          {`ยังไม่ได้เข้าสู่ระบบ`}
        </Text>
        <View style={styles.guestButtonsContainer}>
          <Button
            style={styles.guestButton}
            onPress={onLoginButtonPress}
            status="success"
          >
            เข้าสู่ระบบ
          </Button>
          <Button
            style={styles.guestButton}
            status="primary"
            onPress={onRegisterButtonPress}
          >
            ลงทะเบียนใหม่
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
  header: {
    paddingVertical: 24,
    alignItems: "center",
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 62,
    marginVertical: 16,
  },
  guestButtonsContainer: {
    flexDirection: "row",
    marginVertical: 32,
    marginHorizontal: 20,
  },
  guestButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 20,
  },
  guestTitle: {
    zIndex: 1,
  },
});
