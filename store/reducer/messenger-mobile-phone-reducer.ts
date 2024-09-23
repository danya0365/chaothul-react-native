import { MessengerConversation } from "@/models/messenger-conversation";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  mobilePhone: string | null;
  channelId: number | null;
  localCodeId: string | null;
  lastConversationSeen: MessengerConversation | null;
  isNewMessenger: boolean;
}

const initialState: State = {
  mobilePhone: null,
  channelId: null,
  localCodeId: null,
  lastConversationSeen: null,
  isNewMessenger: false,
};

const appSlice = createSlice({
  name: "messenger-mobile-phone",
  initialState,
  reducers: {
    setMobilePhone(state, action: PayloadAction<string | null>) {
      state.mobilePhone = action.payload;
    },
    setIsNewMessenger(state, action: PayloadAction<boolean>) {
      state.isNewMessenger = action.payload;
    },
    setLastConversationSeen(
      state,
      action: PayloadAction<MessengerConversation | null>
    ) {
      state.lastConversationSeen = action.payload;
    },
    setChannelId(state, action: PayloadAction<number | null>) {
      state.channelId = action.payload;
    },
    setLocalCodeId(state, action: PayloadAction<string | null>) {
      state.localCodeId = action.payload;
    },
  },
});

export const {
  setMobilePhone,
  setChannelId,
  setLocalCodeId,
  setLastConversationSeen,
  setIsNewMessenger,
} = appSlice.actions;
export default appSlice.reducer;
