import React from "react";
import { View, FlatList } from "react-native";
import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { ProvinceItem } from "./province-item.component";
import { Province } from "@/models/province.model";

const provinceData = [
  Province.bangkok(),
  Province.narathiwas(),
  Province.yala(),
  Province.pathumthani(),
  Province.nontaburi(),
  Province.songkla(),
  Province.patloong(),
  Province.choompon(),
  Province.petburi(),
  Province.phuket(),
  Province.pattani(),
];

export const FilterByProvince = (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={styles.container}>
      <View style={styles.rowContainer}>
        <Text category="h6">{`หาตามจังหวัด`}</Text>
      </View>
      <View style={[styles.rowContainer, { marginTop: 8 }]}>
        <FlatList
          horizontal={true}
          data={provinceData}
          renderItem={({ item, index, separators }) => (
            <ProvinceItem item={item} index={index} separators={separators} />
          )}
        />
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
