import React from "react";
import { ListRenderItemInfo, RefreshControl } from "react-native";
import { List, StyleService, useStyleSheet } from "@ui-kitten/components";
import { WorkBookingItem } from "./extra/recruit-booking-item.component";
import httpRequest from "../../services/http-request.service";
import { MeApiService } from "../../services/api.service";
import { RecruitBooking } from "@/models/recruit-booking.model";
import LoadingView from "@/components/organisms/loading.view";
import { useNavigation } from "expo-router";

export default (): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const [recruitBookings, setRecruitBookings] = React.useState<
    RecruitBooking[]
  >([]);
  const meApiService = new MeApiService(httpRequest);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);

  const renderItem = (
    info: ListRenderItemInfo<RecruitBooking>
  ): React.ReactElement => (
    <WorkBookingItem style={styles.item} recruitBooking={info.item} />
  );

  const doRequestRecruitBookingList = async (callback: any) => {
    setIsLoading(true);
    try {
      const response = await meApiService.getRecruitBookingList(pageNumber);
      const apiData = response.data.map(
        (workBookings) =>
          RecruitBooking.createFromApi(workBookings) as RecruitBooking
      );
      setRecruitBookings(apiData);
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
    doRequestRecruitBookingList(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    doRequestRecruitBookingList(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      doRequestRecruitBookingList(() => {
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
        data={recruitBookings}
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
