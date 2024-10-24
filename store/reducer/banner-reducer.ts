import { Banner } from "@/models/banner";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  pinnedBanners: Banner[];
}

const initialState: State = {
  pinnedBanners: [],
};

const slice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setPinnedBanners(state, action: PayloadAction<Banner[]>) {
      state.pinnedBanners = action.payload;
    },
  },
});

export const { setPinnedBanners } = slice.actions;
export default slice.reducer;
