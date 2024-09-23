import { RecruitBooking } from "@/models/recruit-booking.model";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  ListItem,
  ListItemProps,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { DoneAllIcon } from "./icons";

export type NotificationItemProps = ListItemProps & {
  recruitBooking: RecruitBooking;
};

export const WorkBookingItem = (
  props: NotificationItemProps
): React.ReactElement => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { recruitBooking, ...listItemProps } = props;

  const renderMessageDate = (): React.ReactElement => (
    <View style={styles.dateContainer}>
      {recruitBooking.bookingStatus == "confirm" && <DoneAllIcon />}
      <Text style={styles.dateText} appearance="hint" category="c1">
        {recruitBooking.formattedBookingDate}
      </Text>
    </View>
  );

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar
      style={styles.avatar as any}
      source={recruitBooking.recruit?.primaryImage}
    />
  );

  const onItemPress = () => {
    router.push(`/recruit-booking/${recruitBooking.id}`);
  };

  return (
    <ListItem
      key={`work-booking-${recruitBooking.id}`}
      {...listItemProps}
      onPress={() => {
        onItemPress();
      }}
      title={recruitBooking.recruit?.author?.fullName}
      description={recruitBooking.recruit?.title}
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
