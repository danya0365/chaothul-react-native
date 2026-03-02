import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import { useAppSelector } from "@/store/hooks";
import {
  Divider,
  StyleService,
  Text,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import { useNavigation } from "expo-router";
import React from "react";

export const CategoryScreen = (): React.ReactElement => {
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
      <TopNavigation title={`หมวดหมู่`} />
      <Divider />
      <Text>อยู่ในช่วงพัฒนา...</Text>
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
