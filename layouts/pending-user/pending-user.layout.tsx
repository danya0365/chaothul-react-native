import { TabBarProfileOutlineIcon } from "@/components/atoms/icons";
import useAuth from "@/hooks/auth";
import { AuthApiService } from "@/services/api.service";
import { setBearerToken } from "@/services/http-request.service";
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";

type Props = {
  authApiService?: AuthApiService;
};

export default ({
  authApiService = new AuthApiService(),
}: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const { logoutSuccess, authStart, token } = useAuth();
  const theme = useTheme();
  const iconColor = theme["color-primary-300"];
  const textColor = theme["color-primary-300"];

  const onLogoutButtonClick = async () => {
    if (token) {
      try {
        authStart();
        await authApiService.doRequestLogout(token);
      } catch {}
    }
    setBearerToken("");
    logoutSuccess();
    router.replace("/");
  };

  return (
    <Layout
      level="1"
      style={{ width: "100%", flex: 1, backgroundColor: "transparent" }}
    >
      <View
        style={{
          padding: 16,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={styles.introCard}
          onPress={() => {
            //router.push("/new-loan");
          }}
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
              <TabBarProfileOutlineIcon
                fill={iconColor}
                style={styles.introIcon}
              />
              <Text
                category="h6"
                style={{ ...styles.introLabel, color: textColor }}
              >
                ไอดีของคุณอยู่ระหว่างการอนุมัติ
              </Text>
              <Text
                category="h6"
                style={{ ...styles.introLabel, color: textColor }}
              >
                กรุณาลองใหม่ภายหลัง
              </Text>
            </View>
          )}
        </Pressable>
      </View>
      <View
        style={{
          padding: 16,
        }}
      >
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 16,
            backgroundColor: "transparent",
          }}
          level="1"
        >
          <Button
            onPress={() => {
              onLogoutButtonClick();
            }}
            status="danger"
            style={{ flex: 1, borderRadius: 16 }}
          >
            ออกจากระบบ
          </Button>
        </Layout>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  introCard: {
    flex: 1,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
  },
  introContainer: {
    flex: 1,
    aspectRatio: 1,
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
