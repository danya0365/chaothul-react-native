import React from "react";
import { ImageBackground, View } from "react-native";
import { Card, StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import { router } from "expo-router";
import { Work } from "@/models/work.model";

interface Props {
  item: Work;
  index: Number;
  separators: any;
  navigation: any;
}

export const LatestWorkItem = ({
  item,
  index,
  separators,
  navigation,
}: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const onItemPress = (): void => {
    // TODO:
    router.push("/todo");
    // navigation &&
    //   navigation.navigate("Work Detail Screen", {
    //     work: item,
    //   });
    console.log("press item index = " + item);
  };

  const headerCard = (): React.ReactElement => {
    return (
      <ImageBackground
        style={{
          flex: 1,
          height: 120,
        }}
        source={item.primaryImage}
      />
    );
  };
  return (
    <Card
      style={styles.card}
      header={headerCard}
      onPress={onItemPress}
      key={`latest-work-${item.id}`}
    >
      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 16,
          margin: 0,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Text category="s1" numberOfLines={1}>
          {item.shortTitle}
        </Text>
        <Text category="s2">
          {`จังหวัด`}
          {item.province.title}
        </Text>
      </View>
    </Card>
  );
};

const themedStyles = StyleService.create({
  card: {
    margin: 2,
    flex: 1,
    borderRadius: 16,
    width: 200,
  },
});
