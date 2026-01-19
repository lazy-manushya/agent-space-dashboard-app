import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { tagReducer } from "./slices/sample";

export const store = configureStore({
  reducer: {
    tag: tagReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppState = ReturnType<typeof store.getState>;
