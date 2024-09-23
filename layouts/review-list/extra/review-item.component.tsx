import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Avatar, ListItem, ListItemProps, Text } from "@ui-kitten/components";
import { DoneAllIcon } from "./icons";
import { Review } from "@/models/review.model";

export type NotificationItemProps = ListItemProps & {
  review: Review;
};

export const ReviewItem = (
  props: NotificationItemProps
): React.ReactElement => {
  const { review, onPress, ...listItemProps } = props;

  const renderMessageDate = (style: any): React.ReactElement => (
    <View style={styles.dateContainer}>
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
      description={review.postMessge}
      accessoryLeft={renderProfileAvatar}
      accessoryRight={renderMessageDate}
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
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    textAlign: "right",
    minWidth: 64,
  },
});
