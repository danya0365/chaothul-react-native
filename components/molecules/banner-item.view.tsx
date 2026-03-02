import { Banner } from "@/models/banner";
import { BannerApiService } from "@/services/api.service";
import {
  StyleService,
  useStyleSheet,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  View,
} from "react-native";

type Props = { banner: Banner; bannerApiService?: BannerApiService };

export default ({
  banner,
  bannerApiService = new BannerApiService(),
}: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const deviceWidth = Dimensions.get("window").width;
  const bannerHeight = (deviceWidth * 800) / 1200;
  const theme = useTheme();
  const titleColor = theme["text-control-color"];
  const subtitleColor = theme["color-basic-300"];
  const imageBackgroundColor = theme["color-primary-500"];

  const itemProduct = () => {
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
        source={{ uri: banner.imageUrl }}
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
              >{`${banner.name}`}</Text>
            </View>
            <View>
              <Text
                category="s2"
                style={{ color: subtitleColor }}
              >{`คูปองแลกได้จนถึง ${banner.bannerProduct?.formattedExpiredDate}`}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };

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
        source={{ uri: banner.imageUrl }}
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
              >{`${banner.name}`}</Text>
            </View>
            <View>
              <Text
                category="s2"
                style={{ color: subtitleColor }}
              >{`โปรโมชั่นถึง ${banner.bannerPromotion?.formattedExpiredDate}`}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };

  const itemExternalLink = () => {
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
        source={{ uri: banner.imageUrl }}
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
              >{`${banner.name}`}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };

  const item = () => {
    switch (banner.type) {
      case "external_url":
        return itemExternalLink();
      case "product":
        return itemProduct();
      case "promotion":
        return itemPromotion();
    }
  };

  const handleOnBannerClick = () => {
    bannerApiService.getBannerById({ id: `${banner.id}` });
    switch (banner.type) {
      case "external_url":
        Linking.openURL(banner.externalUrl);
        break;
      case "product":
        router.push(`/product-detail/${banner.bannerProductId}`);
        break;
      case "promotion":
        router.push(`/promotion-detail/${banner.bannerPromotionId}`);
        break;
    }
  };

  return (
    <Pressable style={styles.banner} onPress={handleOnBannerClick}>
      {({ pressed }) => (
        <Animated.View
          style={[
            styles.bannerContainer,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          {item()}
        </Animated.View>
      )}
    </Pressable>
  );
};

const themedStyles = StyleService.create({
  banner: {
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
