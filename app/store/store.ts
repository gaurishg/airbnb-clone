import { configureStore } from '@reduxjs/toolkit';
import { registerModalSlice } from './registerModalSlicer';
import { loginModalSlice } from './loginModalSlicer';

export const store = configureStore({
  reducer: {
    registerModal: registerModalSlice.reducer,
    loginModal: loginModalSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;