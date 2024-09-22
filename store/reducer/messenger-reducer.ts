import { MessengerConversation } from "@/models/messenger-conversation";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  channelId: number | null;
  localCodeId: string | null;
  lastConversationSeen: MessengerConversation | null;
  isNewMessenger: boolean;
}

const initialState: State = {
  channelId: null,
  localCodeId: null,
  lastConversationSeen: null,
  isNewMessenger: false,
};

const appSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
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
    resetMessenger(state) {
      state.channelId = null;
      state.localCodeId = null;
      state.lastConversationSeen = null;
      state.isNewMessenger = false;
    },
  },
});

export const {
  setChannelId,
  setLocalCodeId,
  setLastConversationSeen,
  setIsNewMessenger,
  resetMessenger,
} = appSlice.actions;
export default appSlice.reducer;
