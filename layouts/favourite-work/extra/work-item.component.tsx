import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ListItem, ListItemProps, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { Work } from "@/models/work.model";

export type FavouriteWorkItemProps = ListItemProps & {
  index: number;
  work: Work;
};

export const FavouriteWorkItem = (
  props: FavouriteWorkItemProps
): React.ReactElement => {
  const { style, work, index, ...listItemProps } = props;
  const navigation = useNavigation();

  const onItemPress = (): void => {
    router.push(`/work/${work.id}`);
  };

  return (
    <ListItem
      {...listItemProps}
      style={[styles.container, style]}
      onPress={onItemPress}
    >
      <Image style={styles.image} source={work.primaryImage} />
      <View style={styles.detailsContainer}>
        <Text category="s1">{work.title}</Text>
        <Text appearance="hint" category="p2">
          {work.shortDescription}
        </Text>
        <Text category="s2">{work.formattedPrice}</Text>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  image: {
    width: 120,
    height: 100,
  },
  detailsContainer: {
    flex: 1,
    height: "100%",
    padding: 16,
  },
  amountContainer: {
    position: "absolute",
    flexDirection: "row",
    left: 16,
    bottom: 16,
  },
  amountButton: {
    borderRadius: 16,
  },
  amount: {
    textAlign: "center",
    width: 40,
  },
  removeButton: {
    position: "absolute",
    right: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
