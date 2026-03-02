import { WorkBooking } from "@/models/work-booking.model";
import { Work } from "@/models/work.model";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setWorkBookings, setWorks } from "@/store/reducer/work-reducer";
import { useCallback, useMemo } from "react";

const useWork = () => {
  const dispatch = useAppDispatch();
  const { works, workBookings } = useAppSelector((state) => state.work);

  const setWorksCallback = useCallback((val: Work[]) => {
    dispatch(setWorks(val));
  }, []);

  const setWorkBookingsCallback = useCallback((val: WorkBooking[]) => {
    dispatch(setWorkBookings(val));
  }, []);

  return {
    works,
    workBookings,
    setWorks: setWorksCallback,
    setWorkBookings: setWorkBookingsCallback,
  };
};

export default useWork;
