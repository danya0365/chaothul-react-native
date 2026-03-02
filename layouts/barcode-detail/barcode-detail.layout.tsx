import FullLoadingView from "@/components/organisms/full-loading.view";
import LoadingView from "@/components/organisms/loading.view";
import { BarcodeApiService } from "@/services/api.service";
import {
  Button,
  Layout,
  StyleService,
  Tab,
  TabView,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  barcodeApiService?: BarcodeApiService;
};

export default (props: Props): React.ReactElement => {
  const { barcodeApiService = new BarcodeApiService() } = props;
  const styles = useStyleSheet(themedStyles);
  const insetsConfig = useSafeAreaInsets();
  const { code } = useLocalSearchParams<{ code: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [tabSelectedIndex, setTabSelectedIndex] = React.useState(0);
  const [qr, setQr] = useState<string>();
  const [code128, setCode128] = useState<string>();

  const getQrCode = async () => {
    if (!code) return;
    try {
      setIsLoading(true);
      const response = await barcodeApiService.getQr({ code });
      if (response.status) {
        setQr(response.data);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const getCode128 = async () => {
    if (!code) return;
    try {
      setIsLoading(true);
      const response = await barcodeApiService.getCode128({
        code,
      });
      if (response.status) {
        setCode128(response.data);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQrCode();
    getCode128();
  }, [code]);

  if (isLoading) return <FullLoadingView />;

  return (
    <Layout
      level="1"
      style={{
        width: "100%",
        flex: 1,
        gap: 16,
        padding: 16,
        marginBottom: insetsConfig.bottom,
      }}
    >
      <View
        style={[
          styles.contentContainer,
          {
            flexGrow: 1,
            width: "100%",
            flexDirection: "column",
          },
        ]}
      >
        <ScrollView
          style={[
            styles.textContainer,
            {
              flex: 1,
              width: "100%",
              borderRadius: 16,
            },
          ]}
          contentContainerStyle={{ flexGrow: 1, gap: 16 }}
        >
          <View style={{ padding: 16 }}>
            <Text
              category="h6"
              style={{
                paddingBottom: 16,
                textAlign: "center",
              }}
            >
              ใช้สำหรับสแกนเพื่อเปิดหน้านี้
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TabView
              style={{ flex: 1 }}
              selectedIndex={tabSelectedIndex}
              onSelect={(index) => setTabSelectedIndex(index)}
            >
              <Tab
                style={styles.tab}
                title={
                  <View
                    style={{
                      padding: 8,
                    }}
                  >
                    <Text category="h6" style={styles.tabLabel}>
                      รหัส
                    </Text>
                  </View>
                }
              >
                <Layout style={styles.tabContainer} level="3">
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 40,
                    }}
                  >
                    <Text category="h2">{code}</Text>
                  </View>
                </Layout>
              </Tab>
              <Tab
                style={{ ...styles.tab }}
                title={
                  <View style={{ padding: 8 }}>
                    <Text category="h6" style={styles.tabLabel}>
                      บาร์โค้ด
                    </Text>
                  </View>
                }
              >
                <Layout
                  style={{ ...styles.tabContainer, padding: 4 }}
                  level="3"
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 40,
                    }}
                  >
                    {code128 ? (
                      <Image
                        style={{ width: "100%", height: 40 }}
                        source={{
                          uri: code128,
                        }}
                      />
                    ) : null}
                  </View>
                </Layout>
              </Tab>
              <Tab
                style={styles.tab}
                title={
                  <View style={{ padding: 8 }}>
                    <Text category="h6" style={styles.tabLabel}>
                      คิวอาร์โค้ด
                    </Text>
                  </View>
                }
              >
                <Layout style={styles.tabContainer} level="3">
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 40,
                    }}
                  >
                    {qr ? (
                      <Image
                        style={{ width: 240, aspectRatio: 1 }}
                        source={{
                          uri: qr,
                        }}
                      />
                    ) : null}
                  </View>
                </Layout>
              </Tab>
            </TabView>
          </View>
        </ScrollView>
      </View>

      <View style={{ gap: 16 }}>
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
          level="1"
        >
          <Button
            onPress={() => {
              router.back();
            }}
            status="danger"
            appearance="outline"
            style={styles.button}
          >
            กลับไป
          </Button>
        </Layout>
      </View>
      {isLoading && <LoadingView />}
    </Layout>
  );
};

const themedStyles = StyleService.create({
  contentContainer: {
    backgroundColor: "background-basic-color-1",
  },
  textContainer: {
    backgroundColor: "background-basic-color-3",
  },
  label: {
    marginBottom: 4,
    color: "text-basic-color",
  },
  borderBottom: {
    borderBottomColor: "border-basic-color-3",
    borderBottomWidth: 4,
  },
  button: { borderRadius: 16, flex: 1 },

  tabContainer: {
    flex: 1,
    padding: 16,
  },
  tab: {
    backgroundColor: "background-basic-color-3",
  },
  tabLabel: {
    padding: 8,
    fontFamily: "Sarabun_700Bold",
  },
});
