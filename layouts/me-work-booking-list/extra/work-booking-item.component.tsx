import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  ListItem,
  ListItemProps,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { DoneAllIcon } from "./icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { WorkBooking } from "@/models/work-booking.model";
import {
  CheckmarkCircleIcon,
  CheckmarkIcon,
  LoaderIcon,
  PersonDeleteIcon,
} from "@/components/atoms/icons";

export type NotificationItemProps = ListItemProps & {
  workBooking: WorkBooking;
};

const grayColor = "#C2C2C2";

export const WorkBookingItem = (
  props: NotificationItemProps
): React.ReactElement => {
  const theme = useTheme();
  const navigation = useNavigation() as any;
  const { workBooking, ...listItemProps } = props;

  const renderMessageDate = (): React.ReactElement => (
    <View style={styles.dateContainer}>
      {workBooking.bookingStatus.isWaiting && (
        <LoaderIcon width={16} height={16} fill={grayColor} />
      )}
      {workBooking.bookingStatus.isConfirm && (
        <CheckmarkIcon width={16} height={16} fill={grayColor} />
      )}
      {workBooking.bookingStatus.isClose && (
        <CheckmarkCircleIcon width={16} height={16} fill={grayColor} />
      )}
      {workBooking.bookingStatus.isCancel && (
        <PersonDeleteIcon width={16} height={16} fill={grayColor} />
      )}
      {workBooking.bookingStatus.isReject && (
        <PersonDeleteIcon width={16} height={16} fill={grayColor} />
      )}
      <Text style={styles.dateText} appearance="hint" category="c1">
        {workBooking.formattedBookingDate}
      </Text>
    </View>
  );

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar style={styles.avatar} source={workBooking.work.primaryImage} />
  );

  const onItemPress = () => {
    // TODO:
    router.push("/todo");
    // navigation &&
    //   navigation.navigate("Work Booking Detail Screen", {
    //     workBooking: workBooking,
    //   });
  };

  return (
    <ListItem
      key={`work-booking-${workBooking.id}`}
      {...listItemProps}
      onPress={() => {
        onItemPress();
      }}
      title={workBooking.work.title}
      description={`ทะเบียนรถ ${workBooking.work.code}`}
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
