import { configureStore } from "@reduxjs/toolkit";
import { darkTheme_slice } from "./darkThemeSlice";

export const rootStore = configureStore({
  reducer: darkTheme_slice.reducer,
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;
