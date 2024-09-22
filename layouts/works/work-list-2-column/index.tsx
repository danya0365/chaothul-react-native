import React from "react";
import {
  Dimensions,
  ImageBackground,
  ListRenderItemInfo,
  View,
} from "react-native";
import {
  Button,
  Card,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import WorkItemComponent from "./extra/work-item.component";
import { Work } from "@/models/work.model";

interface Props {
  works: Work[];
  pageNumber: number;
  setPageNumber: any;
}

export default ({
  works,
  pageNumber,
  setPageNumber,
}: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const renderProductItem = (
    info: ListRenderItemInfo<Work>
  ): React.ReactElement => <WorkItemComponent {...info} />;

  const onEndReached = (info: { distanceFromEnd: number }) => {
    console.log("onEndReached", info);

    //setPageNumber(pageNumber + 1);
  };

  return (
    <List
      onEndReached={onEndReached}
      style={styles.container}
      data={works}
      numColumns={2}
      renderItem={renderProductItem}
    />
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
  },
});
