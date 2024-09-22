import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Avatar, ListItem, ListItemProps, Text } from "@ui-kitten/components";
import { DoneAllIcon } from "./icons";
import { Review } from "../../../model/review.model";

export type NotificationItemProps = ListItemProps & {
  review: Review;
};

export const ReviewItem = (
  props: NotificationItemProps
): React.ReactElement => {
  const { review, onPress, ...listItemProps } = props;

  const renderMessageDate = (style: ViewStyle): React.ReactElement => (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText} appearance="hint" category="c1">
        {review.formattedDate}
      </Text>
    </View>
  );

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar style={styles.avatar} source={review.author.photo} />
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
    tintColor: null,
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
