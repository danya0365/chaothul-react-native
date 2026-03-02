import { Review } from "@/models/review.model";
import { Avatar, ListItem, ListItemProps, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

export type ReviewItemProps = ListItemProps & {
  review: Review;
};

export const ReviewItem = (
  props: ReviewItemProps
): React.ReactElement => {
  const { review, onPress, ...listItemProps } = props;

  const renderMeta = (style: any): React.ReactElement => (
    <View style={styles.metaContainer}>
      <Text style={styles.ratingText} category="c1">
        ⭐ {review.rating}
      </Text>
      <Text style={styles.dateText} appearance="hint" category="c1">
        {review.formattedDate}
      </Text>
    </View>
  );

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar style={styles.avatar as any} source={review.author.photoUrl} />
  );

  return (
    <ListItem
      {...listItemProps}
      onPress={onPress}
      title={review.author.fullName}
      description={review.shortContent}
      accessoryLeft={renderProfileAvatar}
      accessoryRight={renderMeta}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    tintColor: "transparent",
    marginRight: 10,
  },
  metaContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  ratingText: {
    textAlign: "right",
    marginBottom: 2,
  },
  dateText: {
    textAlign: "right",
    minWidth: 64,
  },
});
