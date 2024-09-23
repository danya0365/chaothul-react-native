import LoadingView from "@/components/organisms/loading.view";
import useAuth from "@/hooks/auth";
import { Recruit } from "@/models/recruit.model";
import { List, StyleService, useStyleSheet } from "@ui-kitten/components";
import { router, useNavigation } from "expo-router";
import React from "react";
import { ListRenderItemInfo, RefreshControl } from "react-native";
import { MeApiService } from "../../services/api.service";
import httpRequest from "../../services/http-request.service";
import { RecruitItem } from "./extra/recruit-item.component";

export default (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const [recruits, setRecruits] = React.useState<Recruit[]>([]);
  const { user } = useAuth();
  const meApiService = new MeApiService(httpRequest);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onItemPress = (recruit: Recruit): void => {
    router.push(`/recruit/${recruit.id}`);
  };

  const doRequestOtherRecruit = async (callback: () => void) => {
    setIsLoading(true);
    try {
      const response = await meApiService.getOtherRecruits(user?.id ?? 0, 1);
      const apiRecruit = response.data.map((recruit) =>
        Recruit.createFromApi(recruit)
      );
      setRecruits(apiRecruit);
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
    doRequestOtherRecruit(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    doRequestOtherRecruit(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      doRequestOtherRecruit(() => {
        setRefreshing(false);
      });
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = (
    info: ListRenderItemInfo<Recruit>
  ): React.ReactElement => (
    <RecruitItem
      style={styles.item}
      recruit={info.item}
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
        data={recruits}
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
