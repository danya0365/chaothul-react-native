import {
  CustomerOutlineIcon,
  MerchantOutlineIcon,
  TabBarProfileOutlineIcon,
} from "@/components/atoms/icons";
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

type Props = {};

export default (_: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const iconColor = theme["color-primary-300"];
  const textColor = theme["color-primary-300"];

  const onCustomerButtonClick = async () => {
    router.push("/auth/customer-register-login");
  };

  const onMerchantButtonClick = async () => {
    router.push("/auth/merchant-register-login");
  };

  return (
    <Layout
      level="1"
      style={{ width: "100%", flex: 1, backgroundColor: "transparent" }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 48,
          }}
        >
          <Pressable
            style={{ ...styles.introCard }}
            onPress={onCustomerButtonClick}
          >
            {({ pressed }) => (
              <View
                style={[
                  styles.introContainer,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <CustomerOutlineIcon
                  fill={iconColor}
                  style={styles.introIcon}
                />
                <Text
                  category="h6"
                  style={{ ...styles.introLabel, color: textColor }}
                >
                  ลูกค้า
                </Text>
              </View>
            )}
          </Pressable>
          <Pressable
            style={{ ...styles.introCard }}
            onPress={onMerchantButtonClick}
          >
            {({ pressed }) => (
              <View
                style={[
                  styles.introContainer,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <MerchantOutlineIcon
                  fill={iconColor}
                  style={styles.introIcon}
                />
                <Text
                  category="h6"
                  style={{ ...styles.introLabel, color: textColor }}
                >
                  ร้านค้า
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  introCard: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
  },
  introContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 16,
  },
  introLabel: {
    marginBottom: 4,
  },
  introIcon: {
    aspectRatio: 1.0,
    height: 150,
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
