import { combineReducers } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appReducer from "./reducer/app-reducer";
import messengerReducer from "./reducer/messenger-reducer";
import notificationReducer from "./reducer/notification-reducer";
import bannerReducer from "./reducer/banner-reducer";
import authReducer from "./reducer/auth-reducer";
import messengerMobilePhoneReducer from "./reducer/messenger-mobile-phone-reducer";
import sessionReducer from "./reducer/session-reducer";
import workReducer from "./reducer/work-reducer";

const mainStorage = AsyncStorage;

const rootReducer = combineReducers({
  app: persistReducer<ReturnType<typeof appReducer>>(
    {
      key: "app",
      storage: mainStorage,
      stateReconciler: autoMergeLevel2,
    },
    appReducer
  ),
  auth: persistReducer<ReturnType<typeof authReducer>>(
    {
      key: "auth",
      storage: mainStorage,
      stateReconciler: autoMergeLevel2,
    },
    authReducer
  ),
  messenger: persistReducer<ReturnType<typeof messengerReducer>>(
    {
      key: "messenger",
      storage: mainStorage,
      stateReconciler: autoMergeLevel2,
    },
    messengerReducer
  ),
  messengerMobilePhone: persistReducer<
    ReturnType<typeof messengerMobilePhoneReducer>
  >(
    {
      key: "messenger-mobilephone",
      storage: mainStorage,
      stateReconciler: autoMergeLevel2,
    },
    messengerMobilePhoneReducer
  ),
  notification: persistReducer<ReturnType<typeof notificationReducer>>(
    {
      key: "notification",
      storage: mainStorage,
      stateReconciler: autoMergeLevel2,
    },
    notificationReducer
  ),
  banner: persistReducer<ReturnType<typeof bannerReducer>>(
    {
      key: "banner",
      storage: mainStorage,
      stateReconciler: autoMergeLevel2,
    },
    bannerReducer
  ),
  work: persistReducer<ReturnType<typeof workReducer>>(
    {
      key: "work",
      storage: mainStorage,
      stateReconciler: autoMergeLevel2,
    },
    workReducer
  ),
  session: sessionReducer,
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof rootReducer>;
