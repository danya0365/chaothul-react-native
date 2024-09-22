import React from "react";
import { ListRenderItemInfo, RefreshControl } from "react-native";
import { List, StyleService, useStyleSheet } from "@ui-kitten/components";
import { WorkBookingItem } from "./extra/work-booking-item.component";
import httpRequest from "../../services/http-request.service";
import { WorkApiService } from "../../services/api.service";
import { WorkBooking } from "@/models/work-booking.model";
import { useNavigation } from "expo-router";
import LoadingView from "@/components/organisms/loading.view";
import useWork from "@/hooks/work";

export default ({ workId }: { workId: number }): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { workBookings, setWorkBookings } = useWork();
  const workApiService = new WorkApiService(httpRequest);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);

  const renderItem = (
    info: ListRenderItemInfo<WorkBooking>
  ): React.ReactElement => (
    <WorkBookingItem style={styles.item} workBooking={info.item} />
  );

  const doRequestWorkBookingList = async (callback: any) => {
    setIsLoading(true);
    try {
      const response = await workApiService.getWorkBookingList(
        workId,
        pageNumber
      );
      const apiWorkBookings = response.data.map(
        (workBookings) => WorkBooking.createFromApi(workBookings) as WorkBooking
      );
      setWorkBookings(apiWorkBookings);
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
    doRequestWorkBookingList(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    doRequestWorkBookingList(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      doRequestWorkBookingList(() => {
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
        style={styles.list}
        data={workBookings}
        renderItem={renderItem}
      />
      {isLoading && <LoadingView />}
    </>
  );
};

const themedStyles = StyleService.create({
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-3",
  },
});
