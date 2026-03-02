import LoadingView from "@/components/organisms/loading.view";
import useRecruit from "@/hooks/recruit";
import { RecruitBooking } from "@/models/recruit-booking.model";
import { WorkBooking } from "@/models/work-booking.model";
import { List, StyleService, useStyleSheet } from "@ui-kitten/components";
import { useNavigation } from "expo-router";
import React from "react";
import { ListRenderItemInfo, RefreshControl } from "react-native";
import { RecruitApiService } from "../../services/api.service";
import httpRequest from "../../services/http-request.service";
import { RecruitBookingItem } from "./extra/recruit-booking-item.component";

export default ({ recruitId }: { recruitId: number }): React.ReactElement => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { recruitBookings, setRecruitBookings } = useRecruit();
  const recruitApiService = new RecruitApiService(httpRequest);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);

  const renderItem = (
    info: ListRenderItemInfo<RecruitBooking>
  ): React.ReactElement => (
    <RecruitBookingItem style={styles.item} recruitBooking={info.item} />
  );

  const doRequestWorkBookingList = async (callback: any) => {
    setIsLoading(true);
    try {
      const response = await recruitApiService.getRecruitBookingList(
        recruitId,
        pageNumber
      );
      const apiRecruitBookings = response.data.map((recruitBookings) =>
        RecruitBooking.createFromApi(recruitBookings)
      );
      setRecruitBookings(apiRecruitBookings);
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
