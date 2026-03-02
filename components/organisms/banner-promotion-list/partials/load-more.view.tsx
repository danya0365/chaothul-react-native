import { BannerApiService } from "@/services/api.service";
import { useAppDispatch, UseAppDispatch } from "@/store/hooks";
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { useNavigation } from "expo-router";
import React from "react";
import { View } from "react-native";

type Props = {
  itemCount: number;
  isCanLoadMore: boolean;
  onLoadMoreClick: () => void;
};

export default (props: Props): React.ReactElement => {
  const { itemCount, onLoadMoreClick, isCanLoadMore } = props;
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout level="1" style={styles.container}>
      <View
        style={{ padding: 4, alignItems: "center", justifyContent: "center" }}
      >
        <Text>ทั้งหมด {`${itemCount}`} รายการ</Text>
      </View>
      <View
        style={{
          padding: 4,
          alignItems: "center",
          justifyContent: "center",
          display: isCanLoadMore ? "flex" : "none",
        }}
      >
        <Button
          onPress={() => {
            onLoadMoreClick();
          }}
        >
          ดูรายการเพิ่มเติม...
        </Button>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
});
