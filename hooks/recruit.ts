import { RecruitBooking } from "@/models/recruit-booking.model";
import { Recruit } from "@/models/recruit.model";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setRecruitBookings,
  setRecruits,
} from "@/store/reducer/recruit-reducer";
import { useCallback } from "react";

const useRecruit = () => {
  const dispatch = useAppDispatch();
  const { recruits, recruitBookings } = useAppSelector(
    (state) => state.recruit
  );

  const setRecruitsCallback = useCallback((val: Recruit[]) => {
    dispatch(setRecruits(val));
  }, []);

  const setRecruitBookingsCallback = useCallback((val: RecruitBooking[]) => {
    dispatch(setRecruitBookings(val));
  }, []);

  return {
    recruits,
    recruitBookings,
    setRecruits: setRecruitsCallback,
    setRecruitBookings: setRecruitBookingsCallback,
  };
};

export default useRecruit;
