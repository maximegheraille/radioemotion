import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialCookie } from "./initialTheme";
import type { RootState } from "./store";

// Define a type for the slice state
interface CookieConsent {
  cookie: boolean | null;
  initialized: boolean;
}

// Define the initial state using that type
const initialState: CookieConsent = {
  cookie: getInitialCookie(),
  initialized: false,
};

// `createSlice` will infer the state type from the `initialState` argument
export const cookieSlice = createSlice({
  name: "cookieSlice",
  initialState,
  reducers: {
    changeCookies: (state, action: PayloadAction<boolean>) => {
      state.cookie = action.payload;
      localStorage.setItem("cookieConsent", String(action.payload));
    },
    initialize: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
  },
});

export const { changeCookies, initialize } = cookieSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const cookieConsent = (state: RootState) => state.cookieConsent;

export default cookieSlice.reducer;
