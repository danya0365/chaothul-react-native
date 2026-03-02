import { RecruitBooking } from "@/models/recruit-booking.model";
import { Recruit } from "@/models/recruit.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  recruits: Recruit[];
  recruitBookings: RecruitBooking[];
}

const initialState: State = {
  recruits: [],
  recruitBookings: [],
};

const slice = createSlice({
  name: "recruit",
  initialState,
  reducers: {
    setRecruits(state, action: PayloadAction<Recruit[]>) {
      state.recruits = action.payload;
    },
    setRecruitBookings(state, action: PayloadAction<RecruitBooking[]>) {
      state.recruitBookings = action.payload;
    },
  },
});

export const { setRecruits, setRecruitBookings } = slice.actions;
export default slice.reducer;
