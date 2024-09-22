import React from "react";
import { ListRenderItemInfo, RefreshControl } from "react-native";
import { List, StyleService, useStyleSheet } from "@ui-kitten/components";
import { FavouriteWorkItem } from "./extra/work-item.component";
import httpRequest from "../../services/http-request.service";
import { Work } from "@/models/work.model";
import LoadingView from "@/components/organisms/loading.view";
import { MeApiService } from "@/services/api.service";
import { useNavigation } from "expo-router";

export default (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyle);
  const [works, setWorks] = React.useState<Work[]>([]);

  const meApiService = new MeApiService(httpRequest);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const renderWorkItem = (
    info: ListRenderItemInfo<Work>
  ): React.ReactElement => (
    <FavouriteWorkItem
      key={`like-work-${info.item.id}`}
      style={styles.item}
      index={info.index}
      work={info.item}
    />
  );

  const doRequestFavouriteWorks = async (callback: any) => {
    setIsLoading(true);
    try {
      const response = await meApiService.getLikeWorks(1);
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
    doRequestFavouriteWorks(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    doRequestFavouriteWorks(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      doRequestFavouriteWorks(() => {
        setRefreshing(false);
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <List
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={works}
        renderItem={renderWorkItem}
      />
      {isLoading && <LoadingView />}
    </>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-3",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});
