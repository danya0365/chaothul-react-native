import React, { memo, useMemo } from "react";
import moment from "moment";
import { WorkBooking } from "../../../model/work-booking.model";
import httpRequest, {
  ApiErrorResponse,
} from "../../../services/http-request.service";
import { WorkApiService } from "../../../services/api.service";
import LoadingComponent from "../../../components/loading.component";
import CalendarComponent from "./calendar.component";

const BookingCalendarComponent = ({
  workId,
  isLoading,
  setIsLoading,
}: {
  workId: number;
  isLoading: boolean;
  setIsLoading: any;
}): React.ReactElement => {
  const workApiService = new WorkApiService(httpRequest);
  const [initialDate, setInitialDate] = React.useState<moment.Moment>();
  const [confirmWorkBookings, setConfirmWorkBookings] = React.useState<
    WorkBooking[]
  >([]);
  const getConfirmWorkBookings = async (
    visibleDate: moment.Moment = moment()
  ) => {
    setIsLoading(true);
    try {
      const currentDate = moment(visibleDate);
      const prevMonth = moment(currentDate).subtract(1, "M");
      const futureMonth = moment(currentDate).add(1, "M");
      const dateStart = moment(prevMonth).startOf("month").toDate();
      const dateEnd = moment(futureMonth).endOf("month").toDate();
      const response = await workApiService.getConfirmBookings(
        workId,
        1,
        100,
        dateStart,
        dateEnd
      );
      if (response.status) {
        let responseDataList = response.data.list.map((data) => {
          return WorkBooking.createFromApi(data) as WorkBooking;
        });
        responseDataList = myUnionBy(
          [responseDataList, confirmWorkBookings],
          "id"
        ) as WorkBooking[];
        setConfirmWorkBookings(responseDataList);
        if (!initialDate) {
          setInitialDate(moment());
        }
      }
      setIsLoading(false);
    } catch (err: any) {
      if (err.response?.status === 401) {
        console.log(err.response.data);
        const data: ApiErrorResponse = err.response.data;
        console.log(data);
      } else {
        console.error(err);
      }
      setIsLoading(false);
    }
  };

  const myUnionBy = (arrays: any[], iteratee: string): any => {
    const map = {};

    arrays.forEach((array: any[]) => {
      array.forEach((object: any) => {
        map[object[iteratee]] = object;
      });
    });

    return Object.values(map);
  };

  React.useEffect(() => {
    getConfirmWorkBookings();
  }, []);

  return (
    <>
      {initialDate && (
        <CalendarComponent
          initialDate={initialDate}
          confirmWorkBookings={confirmWorkBookings}
          getConfirmWorkBookings={getConfirmWorkBookings}
        />
      )}
      {isLoading && <LoadingComponent onDismissPress={null} />}
    </>
  );
};

export default memo(BookingCalendarComponent);
