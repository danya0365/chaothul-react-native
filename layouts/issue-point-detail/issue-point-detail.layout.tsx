import FullLoadingView from "@/components/organisms/full-loading.view";
import LoadingView from "@/components/organisms/loading.view";
import { IssuePoint } from "@/models/issue-point";
import { IssuePointApiService } from "@/services/api.service";
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  issuePointApiService?: IssuePointApiService;
};

export default (props: Props): React.ReactElement => {
  const { issuePointApiService = new IssuePointApiService() } = props;
  const styles = useStyleSheet(themedStyles);
  const insetsConfig = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [issuePoint, setIssuePoint] = useState<IssuePoint>();
  const [isLoading, setIsLoading] = useState(false);

  const getIssuePointDetail = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await issuePointApiService.getIssuePointById({ id });
      if (response.status) {
        const newData = IssuePoint.createFromApi(response.data);
        setIssuePoint(newData);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIssuePointDetail();
  }, [id]);

  if (!issuePoint) return <FullLoadingView />;

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
              {issuePoint.name}
            </Text>
            <Text style={{ textAlign: "center" }}>
              เมื่อ {`${issuePoint.formattedCreateDate}`}
            </Text>
          </View>
          <View style={{ flex: 1, padding: 16, gap: 16 }}>
            <Text>{issuePoint.desc}</Text>
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
