import React, { memo } from "react";
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
import { Work } from "@/models/work.model";
import { HeartIcon, MessageCircleIcon } from "@/components/atoms/icons";
import { router } from "expo-router";

const WorkItem = (info: ListRenderItemInfo<Work>): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const onItemPress = (index: number, item: Work): void => {
    router.push(`/work/${item.id}`);
  };

  const renderItemHeader = (
    info: ListRenderItemInfo<Work>
  ): React.ReactElement => (
    <ImageBackground
      style={styles.itemHeader}
      source={info.item.primaryImage}
    />
  );

  const renderItemFooter = (
    info: ListRenderItemInfo<Work>
  ): React.ReactElement => {
    return (
      <View style={styles.itemFooter}>
        <Button
          style={styles.leftButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={MessageCircleIcon}
        >
          {`${info.item.formattedReplyCount}`}
        </Button>
        <Button
          style={styles.rightButton}
          appearance="ghost"
          status="danger"
          accessoryLeft={HeartIcon}
        >
          {`${info.item.formattedLikeCount}`}
        </Button>
      </View>
    );
  };

  return (
    <Card
      key={`column-2-work-${info.item.id}`}
      style={styles.productItem}
      header={() => renderItemHeader(info)}
      onPress={() => onItemPress(info.index, info.item)}
    >
      <View style={styles.itemBody}>
        <Text
          category="s1"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ height: 40 }}
        >
          {info.item.title}
        </Text>
        <Text appearance="hint" category="c1">
          จังหวัด{info.item.province.title}
        </Text>
        <View style={styles.itemFooter}>
          <Button
            style={styles.leftButton}
            appearance="ghost"
            status="basic"
            accessoryLeft={MessageCircleIcon}
          >
            {`${info.item.formattedReplyCount}`}
          </Button>
          <Button
            style={styles.rightButton}
            appearance="ghost"
            status="danger"
            accessoryLeft={HeartIcon}
          >
            {`${info.item.formattedLikeCount}`}
          </Button>
        </View>
      </View>
    </Card>
  );
};

export default memo(WorkItem);

const themedStyles = StyleService.create({
  productItem: {
    flex: 1,
    margin: 2,
    padding: 0,
    alignItems: "stretch",
    backgroundColor: "background-basic-color-1",
  },
  itemHeader: {
    height: 140,
  },
  itemBody: {
    flex: 1,
    margin: 2,
    paddingVertical: 4,
    paddingHorizontal: 4,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  itemFooter: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "flex-start",
  },
  leftButton: {
    paddingHorizontal: 0,
  },
  rightButton: {
    paddingHorizontal: 0,
  },
});
