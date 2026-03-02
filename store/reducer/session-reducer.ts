import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loginPinCode: string | null;
}

// Initial state for the authentication slice
const initialState: AuthState = {
  loginPinCode: null,
};

// Create the authentication slice
const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setLoginPinCode(state, action: PayloadAction<string | null>) {
      state.loginPinCode = action.payload;
    },
  },
});

// Export the actions and reducer
export const { setLoginPinCode } = sessionSlice.actions;
export default sessionSlice.reducer;
