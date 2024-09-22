import React from "react";
import { ListRenderItemInfo, View } from "react-native";
import { List, StyleService, useStyleSheet } from "@ui-kitten/components";
import WorkItemComponent from "../work-list-1-column/extra/work-item.component";
import { Work } from "@/models/work.model";

interface Props {
  works: Work[];
}

export default ({ works }: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const renderItem = (info: ListRenderItemInfo<Work>): React.ReactElement => (
    <WorkItemComponent {...info} />
  );

  return (
    <List
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={works}
      renderItem={renderItem}
    />
  );
};

const themedStyles = StyleService.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
