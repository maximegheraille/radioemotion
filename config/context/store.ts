import { configureStore } from "@reduxjs/toolkit";
import cookieSlice from "./cookieSlice";
import darkTheme_slice from "./darkThemeSlice";
const reducer = {
  darkTheme: darkTheme_slice,
  cookieConsent: cookieSlice,
};

export const rootStore = configureStore({
  reducer,
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;
