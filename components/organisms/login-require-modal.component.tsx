import React from "react";
import { View } from "react-native";
import {
  Button,
  Card,
  Modal,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { TabActions } from "@react-navigation/native";

export default ({ navigation }: { navigation: any }): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const [visible, setVisible] = React.useState(true);
  const onDismissPress = () => {
    setVisible(false);
    const jumpToAction = TabActions.jumpTo("Profile Menu Screen");
    navigation.dispatch(jumpToAction);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setVisible(true);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onDismissPress}
    >
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
    </Modal>
  );
};

const themedStyle = StyleService.create({
  container: {
    minHeight: 192,
  },
  card: {
    borderRadius: 20,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
