import { BannerPromotion } from "@/models/banner-promotion";
import {
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  Platform,
  Pressable,
  View,
} from "react-native";

type Props = { bannerPromotion: BannerPromotion };

export default ({ bannerPromotion }: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const deviceWidth = Dimensions.get("window").width;
  const bannerHeight = (deviceWidth * 800) / 1200;
  const theme = useTheme();
  const titleColor = theme["text-control-color"];
  const subtitleColor = theme["color-basic-300"];
  const imageBackgroundColor = theme["color-primary-500"];

  const itemPromotion = () => {
    let cardStyle = styles.imageContainer;
    if (Platform.OS === "web") {
      cardStyle = {
        ...cardStyle,
        height: bannerHeight,
        width: "100%",
      };
    }
    return (
      <ImageBackground
        style={{ ...cardStyle, flex: 1, backgroundColor: imageBackgroundColor }}
        source={{ uri: bannerPromotion.imageUrl }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "center",
              backgroundColor: `rgba(0, 0, 0, 0.5)`,
              width: "100%",
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <View>
              <Text
                category="h6"
                style={{ ...styles.bold, color: titleColor }}
              >{`${bannerPromotion.name}`}</Text>
            </View>
            <View>
              <Text
                category="s2"
                style={{ color: subtitleColor }}
              >{`โปรโมชั่นถึง ${bannerPromotion?.formattedExpiredDate}`}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };

  const handleOnBannerClick = () => {
    router.push(`/promotion-detail/${bannerPromotion.id}`);
  };

  return (
    <Pressable style={styles.bannerPromotion} onPress={handleOnBannerClick}>
      {({ pressed }) => (
        <Animated.View
          style={[
            styles.bannerContainer,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          {itemPromotion()}
        </Animated.View>
      )}
    </Pressable>
  );
};

const themedStyles = StyleService.create({
  bannerPromotion: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
    width: "100%",
  },
  bannerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
  },
  imageContainer: {
    aspectRatio: 1200 / 800,
    width: "100%",
    background: "transparent",
  },
  thin: {
    fontFamily: "Sarabun_100Thin",
  },
  bold: {
    fontFamily: "Sarabun_700Bold",
  },
  extraBold: {
    fontFamily: "Sarabun_800ExtraBold",
  },
});
