import { Banner } from "@/models/banner";
import { WorkBooking } from "@/models/work-booking.model";
import { Work } from "@/models/work.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  works: Work[];
  workBookings: WorkBooking[];
}

const initialState: State = {
  works: [],
  workBookings: [],
};

const slice = createSlice({
  name: "work",
  initialState,
  reducers: {
    setWorks(state, action: PayloadAction<Work[]>) {
      state.works = action.payload;
    },
    setWorkBookings(state, action: PayloadAction<WorkBooking[]>) {
      state.workBookings = action.payload;
    },
  },
});

export const { setWorks, setWorkBookings } = slice.actions;
export default slice.reducer;
