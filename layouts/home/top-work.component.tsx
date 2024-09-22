import React from "react";
import { View, FlatList } from "react-native";
import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import debounce from "lodash/debounce";
import WorkList2Column from "../works/work-list-2-column";
import httpRequest, {
  ApiDataListResponse,
} from "../../services/http-request.service";
import { AxiosResponse } from "axios";
import { Work } from "@/models/work.model";

interface Props {
  navigation: any;
  refreshFlag: boolean;
}

export const TopWork = ({
  navigation,
  refreshFlag,
}: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [isGettingWork, setIsGettingWork] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [works, setWorks] = React.useState<Work[]>();

  const getTopHitWorks = debounce(() => {
    setIsGettingWork(true);
    httpRequest
      .get(`/works/top-hits`, {
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
        setIsGettingWork(false);
      })
      .catch((error) => {
        console.error(error);
        setIsGettingWork(false);
      });
  }, 500);

  React.useEffect(() => {
    if (refreshFlag && !isGettingWork) {
      getTopHitWorks();
    }
  }, [refreshFlag]);

  React.useEffect(() => {
    getTopHitWorks();
  }, []);

  return (
    <Layout style={styles.container}>
      <View style={styles.rowContainer}>
        <Text category="h6">{`งานที่แนะนำ`}</Text>
      </View>
      <View style={[styles.rowContainer, { marginTop: 8 }]}>
        <WorkList2Column
          navigation={navigation}
          works={works as Work[]}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
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
  },
});
