import React from "react";
import { ListRenderItemInfo, RefreshControl } from "react-native";
import { List, StyleService, useStyleSheet } from "@ui-kitten/components";
import { Work } from "@/models/work.model";
import { WorkItem } from "./extra/work-item.component";
import { MeApiService } from "../../services/api.service";
import httpRequest from "../../services/http-request.service";
import { router, useNavigation } from "expo-router";
import LoadingView from "@/components/organisms/loading.view";

export default (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const [works, setWorks] = React.useState<Work[]>([]);

  const meApiService = new MeApiService(httpRequest);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onItemPress = (work: Work): void => {
    // TODO:
    router.push("/todo");
    // navigation &&
    //   navigation.navigate("Work Detail Screen", {
    //     work: work,
    //   });
  };

  const doRequestYourWorks = async (callback: () => void) => {
    setIsLoading(true);
    try {
      const response = await meApiService.getYourWorks(1);
      const apiWork = response.data.map((work) => Work.createFromApi(work));
      setWorks(apiWork);
      callback();
      setIsLoading(false);
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.log(error.response.data);
        const data = error.response.data;
      } else {
        console.error(error);
      }
      callback();
      setIsLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    doRequestYourWorks(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    doRequestYourWorks(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      doRequestYourWorks(() => {
        setRefreshing(false);
      });
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = (info: ListRenderItemInfo<Work>): React.ReactElement => (
    <WorkItem
      style={styles.item}
      work={info.item}
      onPress={() => {
        onItemPress(info.item);
      }}
    />
  );

  return (
    <>
      <List
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.list}
        data={works}
        renderItem={renderItem}
      />
      {isLoading && <LoadingView />}
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    margin: 2,
    flex: 1,
    borderRadius: 20,
  },
  list: {
    flex: 1,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-3",
  },
});
