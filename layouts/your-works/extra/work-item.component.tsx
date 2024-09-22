import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Avatar, ListItem, ListItemProps, Text } from "@ui-kitten/components";
import { DoneAllIcon } from "./icons";
import { Work } from "@/models/work.model";

export type WorkItemItemProps = ListItemProps & {
  work: Work;
};

export const WorkItem = (props: WorkItemItemProps): React.ReactElement => {
  const { work, onPress, ...listItemProps } = props;

  const renderWorkDate = (style: any): React.ReactElement => (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText} appearance="hint" category="c1">
        {work.formattedDate}
      </Text>
    </View>
  );

  const renderPhoto = (): React.ReactElement => (
    <Avatar style={styles.avatar as any} source={work.primaryImage} />
  );

  return (
    <ListItem
      {...listItemProps}
      onPress={onPress}
      title={work.title}
      description={work.shortDescription}
      accessoryLeft={renderPhoto}
      accessoryRight={renderWorkDate}
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
