import { UserProfile } from "@/models/user-profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  pinCode: string | null;
}

// Initial state for the authentication slice
const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  pinCode: null,
};

// Create the authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        token: string;
      }>
    ) {
      const { token } = action.payload;
      state.token = token;
      state.loading = false;
      state.error = null;
    },
    setUser(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
      state.pinCode = null;
    },
    setPinCode(state, action: PayloadAction<string | null>) {
      state.pinCode = action.payload;
    },
  },
});

// Export the actions and reducer
export const {
  authStart,
  loginSuccess,
  setUser,
  loginFailure,
  logout,
  setPinCode,
} = authSlice.actions;
export default authSlice.reducer;
