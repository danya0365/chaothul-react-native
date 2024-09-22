import { AppConfig } from "@/models/app-config";
import { Province } from "@/models/province.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
  config: AppConfig | null;
  lastNotificationUpdate: string | null;
  lastBannerUpdate: string | null;
  isNewNotification: boolean;
  provinces: Province[] | null;
}

const initialState: AppState = {
  config: null,
  lastNotificationUpdate: null,
  lastBannerUpdate: null,
  isNewNotification: false,
  provinces: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<AppConfig>) {
      state.config = action.payload;
    },
    setIsNewNotification(state, action: PayloadAction<boolean>) {
      state.isNewNotification = action.payload;
    },
    setLastNotificationUpdate(state, action: PayloadAction<string | null>) {
      state.lastNotificationUpdate = action.payload;
    },
    setLastBannerUpdate(state, action: PayloadAction<string | null>) {
      state.lastBannerUpdate = action.payload;
    },
  },
});

export const {
  setConfig,
  setLastNotificationUpdate,
  setLastBannerUpdate,
  setIsNewNotification,
} = appSlice.actions;
export default appSlice.reducer;
