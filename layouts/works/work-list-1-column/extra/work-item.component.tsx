import React, { memo } from "react";
import { ListRenderItemInfo, View, ViewStyle } from "react-native";
import {
  Avatar,
  Button,
  Card,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { ImageOverlay } from "./image-overlay.component";
import { BulbIcon } from "./icons";
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
    <ImageOverlay
      style={styles.itemHeader as ViewStyle}
      source={info.item.primaryImage}
    >
      <Text style={styles.itemTitle} category="h2" status="control">
        {info.item.title}
      </Text>
      <View style={styles.itemDescriptionContainer}>
        <BulbIcon />
        <Text style={styles.itemDescription} category="s1" status="control">
          {info.item.shortDescription}
        </Text>
      </View>
    </ImageOverlay>
  );

  return (
    <Card
      key={`column-1-work-${info.item.id}`}
      style={styles.item}
      header={() => renderItemHeader(info)}
      onPress={() => onItemPress(info.index, info.item)}
    >
      <View style={styles.itemFooter}>
        <Avatar source={info.item.author.photoUrl} />
        <View style={styles.itemAuthoringContainer}>
          <Text category="s2">{info.item.author.fullName}</Text>
          <Text appearance="hint" category="c1">
            {info.item.formattedDate}
          </Text>
        </View>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={MessageCircleIcon}
        >
          {`${info.item.formattedReplyCount}`}
        </Button>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="danger"
          accessoryLeft={HeartIcon}
        >
          {`${info.item.formattedLikeCount}`}
        </Button>
      </View>
    </Card>
  );
};

export default memo(WorkItem);

const themedStyles = StyleService.create({
  item: {
    marginVertical: 8,
    borderRadius: 16,
  },
  itemHeader: {
    height: 220,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  itemTitle: {
    zIndex: 1,
  },
  itemDescriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  itemDescription: {
    marginHorizontal: 16,
  },
  itemFooter: {
    flexDirection: "row",
    marginHorizontal: -8,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  itemAuthoringContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
});
