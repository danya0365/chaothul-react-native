import React from "react";
import { FlatList, RefreshControl } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { SearchBox } from "./search-box.component";
import { LatestWork } from "./latest-work.component";
import { FilterByProvince } from "./filter-by-province.component";
import { TopWork } from "./top-work.component";
import { useNavigation } from "expo-router";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    itemType: "search",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    itemType: "latestWork",
  },
  // {
  //   id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //   title: "Third Item",
  //   itemType: "filterByProvince",
  // },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d74",
    title: "Fourth Item",
    itemType: "topWork",
  },
];

export default (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = ({ item }): React.ReactElement => {
    if (item.itemType == "search") {
      return <SearchBox key={`search-box`} />;
    }
    if (item.itemType == "latestWork") {
      return <LatestWork key={`latest-work`} refreshFlag={refreshing} />;
    }
    if (item.itemType == "filterByProvince") {
      return <FilterByProvince key={`filter-by-province`} />;
    }
    if (item.itemType == "topWork") {
      return <TopWork key={`top-work`} refreshFlag={refreshing} />;
    }
    return <></>;
  };

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    ></FlatList>
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
  image: {
    height: 360,
  },
});
