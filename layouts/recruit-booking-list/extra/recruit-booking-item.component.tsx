import {
  CheckmarkCircleIcon,
  CheckmarkIcon,
  LoaderIcon,
  PersonDeleteIcon,
} from "@/components/atoms/icons";
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
import { ImageStyle, StyleSheet, View } from "react-native";

export type NotificationItemProps = ListItemProps & {
  recruitBooking: RecruitBooking;
};

const grayColor = "#C2C2C2";

export const RecruitBookingItem = (
  props: NotificationItemProps
): React.ReactElement => {
  const theme = useTheme();
  const navigation = useNavigation() as any;
  const { recruitBooking, ...listItemProps } = props;

  const renderMessageDate = (): React.ReactElement => (
    <View style={styles.dateContainer}>
      {recruitBooking.bookingStatus.isWaiting && (
        <LoaderIcon width={16} height={16} fill={grayColor} />
      )}
      {recruitBooking.bookingStatus.isConfirm && (
        <CheckmarkIcon width={16} height={16} fill={grayColor} />
      )}
      {recruitBooking.bookingStatus.isClose && (
        <CheckmarkCircleIcon width={16} height={16} fill={grayColor} />
      )}
      {recruitBooking.bookingStatus.isCancel && (
        <PersonDeleteIcon width={16} height={16} fill={grayColor} />
      )}
      {recruitBooking.bookingStatus.isReject && (
        <PersonDeleteIcon width={16} height={16} fill={grayColor} />
      )}
      <Text style={styles.dateText} appearance="hint" category="c1">
        {recruitBooking.formattedBookingDate}
      </Text>
    </View>
  );

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar
      style={styles.avatar as ImageStyle}
      source={recruitBooking.author?.photoUrl}
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
      title={recruitBooking.author?.fullName}
      description={recruitBooking.customerMessage}
      accessoryLeft={renderProfileAvatar}
      accessoryRight={renderMessageDate}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    tintColor: undefined,
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    marginStart: 4,
    textAlign: "right",
    minWidth: 64,
  },
});
