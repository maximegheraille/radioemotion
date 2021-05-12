import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface DarkTheme {
  darkTheme: boolean;
}

// Define the initial state using that type
const initialState: DarkTheme = {
  darkTheme: false,
};

export const darkTheme_slice = createSlice({
  name: "darkTheme",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<boolean>) => {
      state.darkTheme = action.payload;
    },
  },
});

export const { changeTheme } = darkTheme_slice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.darkTheme;

export default darkTheme_slice.reducer;
