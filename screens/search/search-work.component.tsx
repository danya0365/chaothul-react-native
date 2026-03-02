import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import LoadingView from "@/components/organisms/loading.view";
import { Work } from "@/models/work.model";
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { AxiosResponse } from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import debounce from "lodash/debounce";
import moment from "moment";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import WorkList1Column from "../../layouts/works/work-list-1-column";
import httpRequest, {
  ApiDataListResponse,
} from "../../services/http-request.service";

export const SearchWorkScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const { keyword, provinceId, date } = useLocalSearchParams<{
    keyword: string;
    provinceId: string;
    date: string;
  }>();

  const [works, setWorks] = React.useState<Work[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const filterData = useMemo(() => {
    return date ? moment(date).toDate() : null;
  }, [date]);

  const getSearchWork = debounce(() => {
    setIsSearching(true);
    httpRequest
      .get(`/works`, {
        params: {
          page: 1,
          limit: 15,
          keyword: keyword,
          province_id: provinceId ?? null,
          date: filterData?.toLocaleDateString("en-CA") ?? null,
        },
      })
      .then((response: AxiosResponse<ApiDataListResponse>) => {
        const responseWorks = response.data.data.map((work) =>
          Work.createFromApi(work)
        );
        setWorks(responseWorks);
        setIsSearching(false);
      })
      .catch((error) => {
        console.error(error);
        setIsSearching(false);
      });
  }, 500);

  React.useEffect(() => {
    getSearchWork();
  }, []);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.container} insets="top">
      <TopNavigation title={`ผลการค้นหา`} accessoryLeft={renderBackAction} />
      <Divider />
      <WorkList1Column works={works} />
      {isSearching && <LoadingView />}
    </SafeAreaLayoutView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
