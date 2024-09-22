import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import LoginRequireComponent from "@/components/organisms/login-require.component";
import { useAppSelector } from "@/store/hooks";
import {
  Divider,
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import React from "react";
import NotificationList from "../../layouts/notification-list";
import { useNavigation } from "expo-router";

export const NotificationScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { token } = useAppSelector((state) => state.auth);
  const [modalVisible, setModalVisible] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setModalVisible(true);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title={`แจ้งเตือน`} />
      <Divider />
      {!token ? <LoginRequireComponent /> : <NotificationList />}
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
