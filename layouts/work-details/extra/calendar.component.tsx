import React, { memo } from "react";
import {
  Button,
  Calendar,
  Layout,
  StyleService,
  StyleType,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import {
  CalendarDateInfo,
  CalendarViewModeId,
} from "@ui-kitten/components/ui/calendar/type";
import moment from "moment";
import { StyleProp, View, ViewStyle } from "react-native";
import { WorkBooking } from "../../../model/work-booking.model";
import { MomentDateService } from "@ui-kitten/moment";

const dateService = new MomentDateService();

const CalendarComponent = ({
  initialDate,
  confirmWorkBookings,
  getConfirmWorkBookings,
}: {
  initialDate: moment.Moment;
  confirmWorkBookings: WorkBooking[];
  getConfirmWorkBookings: (date: moment.Moment) => void;
}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [selectedDate, setSelectedDate] =
    React.useState<moment.Moment>(initialDate);
  const [visibleDate, setVisibleDate] = React.useState<moment.Moment>(moment());

  const componentRef = React.createRef<Calendar<moment.Moment>>();

  const scrollToSelected = (): void => {
    if (componentRef.current && selectedDate) {
      componentRef.current.scrollToDate(selectedDate);
    }
  };

  const scrollToToday = (): void => {
    if (componentRef.current) {
      componentRef.current.scrollToToday();
    }
  };

  const onSelectDay = (nextDate: moment.Moment) => {
    setSelectedDate(nextDate);
  };

  const renderDay = (
    info: CalendarDateInfo<moment.Moment>,
    style: StyleType
  ): React.ReactElement => {
    const { date } = info;
    const dayLabel = date.format("D");
    const isConfirmBookings = confirmWorkBookings.filter((data) =>
      moment(data.bookingDate).isSame(date, "day")
    );

    const isConfirmBooking = (): boolean => {
      return isConfirmBookings.length > 0;
    };

    const containerStyle = (): StyleProp<ViewStyle> => {
      if (isConfirmBooking()) {
        return [
          styles.dayContainer,
          style.container,
          {
            backgroundColor: theme["color-primary-500"],
          },
        ];
      }
      return [styles.dayContainer, style.container];
    };

    return (
      <View style={containerStyle()}>
        <Text style={style.text}>{dayLabel}</Text>
        {isConfirmBooking() && <Text>*</Text>}
      </View>
    );
  };

  const onVisibleDateChange = (
    date: moment.Moment,
    viewModeId: CalendarViewModeId
  ) => {
    setVisibleDate(date);
    getConfirmWorkBookings(date);
  };

  return (
    <Layout style={styles.container} level="2">
      <View style={styles.buttonContainer}>
        <Button onPress={scrollToToday}>ไปยังวันที่ปัจจุบัน</Button>
        <Button onPress={scrollToSelected}>ไปยังวันที่เลือก</Button>
      </View>
      <View style={styles.calendarContainer}>
        <Text category="h6" style={styles.text}>
          {`${moment(selectedDate).format("L")}`}
        </Text>
        <Calendar
          ref={componentRef}
          dateService={dateService}
          date={selectedDate}
          renderDay={renderDay}
          onSelect={onSelectDay}
          onVisibleDateChange={onVisibleDateChange}
        />
      </View>
    </Layout>
  );
};
export default memo(CalendarComponent);

const themedStyles = StyleService.create({
  dayContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 8,
  },
  container: {
    flex: 1,
    margin: 2,
    paddingVertical: 4,
    paddingHorizontal: 4,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "flex-start",
  },
  calendarContainer: {
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "flex-start",
  },
  text: {
    marginVertical: 8,
  },
});
