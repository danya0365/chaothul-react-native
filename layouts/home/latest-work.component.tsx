import { Work } from "@/models/work.model";
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { AxiosResponse } from "axios";
import { router } from "expo-router";
import debounce from "lodash/debounce";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import httpRequest, {
  ApiDataListResponse,
} from "../../services/http-request.service";
import { LatestWorkItem } from "./latest-work-item.component";

interface Props {
  refreshFlag: boolean;
}

export const LatestWork = ({ refreshFlag }: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [works, setWorks] = useState<Work[]>();
  const [isGetLatestWork, setIsGetLatestWork] = React.useState(false);

  const getLatestWork = debounce(() => {
    setIsGetLatestWork(true);
    httpRequest
      .get(`/works`, {
        params: {
          page: 1,
          limit: 15,
        },
      })
      .then((response: AxiosResponse<ApiDataListResponse>) => {
        const responseWorks = response.data.data.map((work) =>
          Work.createFromApi(work)
        );
        setWorks(responseWorks);
        setIsGetLatestWork(false);
      })
      .catch((error) => {
        console.error(error);
        setIsGetLatestWork(false);
      });
  }, 500);

  const onButtonPress = () => {
    router.push("/latest-work");
  };

  React.useEffect(() => {
    if (refreshFlag && !isGetLatestWork) {
      getLatestWork();
    }
  }, [refreshFlag]);

  React.useEffect(() => {
    getLatestWork();
  }, []);

  return (
    <Layout style={styles.container}>
      <View style={[styles.rowContainer, { alignItems: "center" }]}>
        <Text category="h6">{`งานใหม่ล่าสุด`}</Text>
        <Button
          size="tiny"
          onPress={onButtonPress}
          appearance="ghost"
          style={{ padding: 4, margin: 2 }}
        >{`ดูทั้งหมด`}</Button>
      </View>
      <View style={[styles.rowContainer, { marginTop: 8 }]}>
        <FlatList
          horizontal={true}
          data={works}
          renderItem={({ item, index, separators }) => (
            <LatestWorkItem item={item} index={index} separators={separators} />
          )}
        />
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
