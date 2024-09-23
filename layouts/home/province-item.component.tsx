import { Province } from "@/models/province.model";
import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import { TouchableHighlight } from "react-native";
import { ImageOverlay } from "./image-overlay.component";

interface Props {
  item: Province;
  index: Number;
  separators: any;
}

export const ProvinceItem = ({
  item,
  index,
  separators,
}: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const onItemPress = (): void => {
    router.push({ pathname: "/search-work", params: { provinceId: item.key } });
  };

  return (
    <TouchableHighlight
      key={item.key}
      onPress={onItemPress}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
    >
      <Layout style={styles.itemContainer}>
        <ImageOverlay style={styles.imageContainer as any} source={item.image}>
          <Text
            category="s1"
            status="control"
            style={{ paddingStart: 20, paddingBottom: 4 }}
          >
            {item.title}
          </Text>
        </ImageOverlay>
      </Layout>
    </TouchableHighlight>
  );
};

const themedStyles = StyleService.create({
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    overflow: "hidden",
    margin: 2,
  },
  imageContainer: {
    minHeight: 100,
    width: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
