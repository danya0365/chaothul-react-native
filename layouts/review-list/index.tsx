import React from "react";
import { ListRenderItemInfo } from "react-native";
import { List, StyleService, useStyleSheet } from "@ui-kitten/components";
import { ReviewItem } from "./extra/review-item.component";
import { Review } from "@/models/review.model";

export default ({ reviews }: { reviews: Review[] }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const onItemPress = (): void => {
    console.log("review click");
  };

  const renderItem = (info: ListRenderItemInfo<Review>): React.ReactElement => (
    <ReviewItem style={styles.item} review={info.item} onPress={onItemPress} />
  );

  return <List style={styles.list} data={reviews} renderItem={renderItem} />;
};

const themedStyles = StyleService.create({
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-3",
  },
});
