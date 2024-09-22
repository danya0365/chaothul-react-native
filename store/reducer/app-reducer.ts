import { AppConfig } from "@/models/app-config";
import { Province } from "@/models/province.model";
import { WorkType } from "@/models/work-type.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
  config: AppConfig | null;
  lastNotificationUpdate: string | null;
  lastBannerUpdate: string | null;
  isNewNotification: boolean;
  provinces: Province[] | null;
  workTypes: WorkType[] | null;
}

const initialState: AppState = {
  config: null,
  lastNotificationUpdate: null,
  lastBannerUpdate: null,
  isNewNotification: false,
  provinces: null,
  workTypes: null,
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
    setProvinces(state, action: PayloadAction<Province[]>) {
      state.provinces = action.payload;
    },
    setWorkTypes(state, action: PayloadAction<WorkType[]>) {
      state.workTypes = action.payload;
    },
  },
});

export const {
  setConfig,
  setLastNotificationUpdate,
  setLastBannerUpdate,
  setIsNewNotification,
  setProvinces,
  setWorkTypes,
} = appSlice.actions;
export default appSlice.reducer;
