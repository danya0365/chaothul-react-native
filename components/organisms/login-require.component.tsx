import React from "react";
import { View } from "react-native";
import {
  Button,
  Card,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { TabActions } from "@react-navigation/native";
import { router } from "expo-router";

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const onDismissPress = () => {
    router.push("/(app)/(root)/(bottom-tab)/profile-menu");
  };

  return (
    <View style={styles.container}>
      <Card disabled={true} style={styles.card}>
        <View style={{ paddingVertical: 16, paddingHorizontal: 24 }}>
          <Text category="h5">กรุณาเข้าสู่ระบบ</Text>
          <Button
            style={{ marginTop: 20, borderRadius: 20 }}
            onPress={onDismissPress}
          >
            ปิด
          </Button>
        </View>
      </Card>
    </View>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 20,
  },
});
