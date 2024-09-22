import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import {
  Avatar,
  ListItem,
  ListItemProps,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { DoneAllIcon } from "./icons";
import {
  UserNotification,
  UserNotificationType,
} from "@/models/user-notification.model";
import {
  AlertTriangleIcon,
  AlertTriangleOutlineIcon,
  BookmarkIcon,
  BookmarkOutlineIcon,
  HeartIcon,
  MessageCircleIcon,
} from "@/components/atoms/icons";
import { router } from "expo-router";

export type NotificationItemProps = ListItemProps & {
  userNotification: UserNotification;
};

export const NotificationItem = (
  props: NotificationItemProps
): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const theme = useTheme();
  const { userNotification, ...listItemProps } = props;

  const renderMessageDate = (): React.ReactElement => (
    <View style={styles.dateContainer}>
      {userNotification.isRead && <DoneAllIcon />}
      <Text style={styles.dateText} appearance="hint" category="c1">
        {userNotification.formattedDate}
      </Text>
    </View>
  );

  const renderNotificationType = (): React.ReactElement => {
    if (userNotification.type == UserNotificationType.WorkBooking) {
      return (
        <BookmarkOutlineIcon
          width={16}
          height={16}
          fill={theme["color-primary-500"]}
        />
      );
    }
    if (userNotification.type == UserNotificationType.BookingConfirm) {
      return (
        <BookmarkIcon
          width={16}
          height={16}
          fill={theme["color-primary-500"]}
        />
      );
    }
    if (userNotification.type == UserNotificationType.WorkLike) {
      return (
        <HeartIcon width={16} height={16} fill={theme["color-primary-500"]} />
      );
    }
    return (
      <MessageCircleIcon
        width={16}
        height={16}
        fill={theme["color-primary-500"]}
      />
    );
  };

  const onItemPress = () => {
    if (userNotification?.work?.id) {
      // TODO:
      router.push("/todo");
      // navigation &&
      //   navigation.navigate("Work Detail Screen", {
      //     work: userNotification.work,
      //   });
    }
  };

  return (
    <ListItem
      key={`notification-${userNotification.id}`}
      {...listItemProps}
      onPress={() => {
        onItemPress();
      }}
      title={userNotification.title}
      description={userNotification.title}
      accessoryLeft={renderNotificationType}
      accessoryRight={renderMessageDate}
    />
  );
};

const themedStyle = StyleService.create({
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
