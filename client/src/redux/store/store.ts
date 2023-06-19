import { configureStore } from '@reduxjs/toolkit';

import userSlice from '../slices/user.slice';
import catalogSlice from '../slices/catalogSlice';
import itemsSlice from '../slices/items.slice';
import loaderSlice from '../slices/loader.slice';
import favSlice from '../slices/favSlice';
import configuratorSlice from '../slices/configuratorSlice';
import PackItemsSlice from '../slices/addItemsTo.slice';

export const store = configureStore({
  reducer: {
    userSlice,
    itemsSlice,
    catalog: catalogSlice,
    loaderSlice,
    favSlice,
    configuratorSlice,
    PackItemsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
