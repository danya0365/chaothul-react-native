import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Avatar, ListItem, ListItemProps, Text } from "@ui-kitten/components";
import { Recruit } from "../../../model/recruit.model";

export type WorkItemItemProps = ListItemProps & {
  recruit: Recruit;
};

export const RecruitItem = (props: WorkItemItemProps): React.ReactElement => {
  const { recruit, onPress, ...listItemProps } = props;

  const renderRecruitDate = (style: ViewStyle): React.ReactElement => (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText} appearance="hint" category="c1">
        {recruit.formattedDate}
      </Text>
    </View>
  );

  const renderPhoto = (): React.ReactElement => (
    <Avatar style={styles.avatar} source={recruit.primaryImage} />
  );

  return (
    <ListItem
      {...listItemProps}
      onPress={onPress}
      title={recruit.title}
      description={recruit.shortDescription}
      accessoryLeft={renderPhoto}
      accessoryRight={renderRecruitDate}
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
