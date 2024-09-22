import React from "react";
import { Dimensions, ListRenderItemInfo, StyleSheet, View } from "react-native";
import {
  Card,
  List,
  ListElement,
  ListItemElement,
  ListProps,
  Text,
} from "@ui-kitten/components";
import { MenuItem } from "@/models/menu-item.model";

export interface MenuGridListProps extends Omit<ListProps, "renderItem"> {
  data: MenuItem[];
  onItemPress: (index: number) => void;
}

export const MenuGridList = (props: MenuGridListProps): ListElement => {
  const { contentContainerStyle, onItemPress, ...listProps } = props;

  const renderItem = (info: ListRenderItemInfo<MenuItem>): ListItemElement => (
    <Card style={styles.item} onPress={() => props.onItemPress(info.index)}>
      <View style={{ paddingVertical: 4, paddingHorizontal: 24 }}>
        {info.item.icon({ width: 24, height: 24, alignSelf: "center" })}
        <Text style={styles.itemTitle} category="s2">
          {info.item.title}
        </Text>
      </View>
    </Card>
  );

  return (
    <List
      {...listProps}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      numColumns={2}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    aspectRatio: 1.0,
    margin: 8,
    maxWidth: Dimensions.get("window").width / 2 - 24,
  },
  itemImage: {
    alignSelf: "center",
    width: 64,
    height: 64,
  },
  itemTitle: {
    alignSelf: "center",
    marginTop: 8,
  },
});
