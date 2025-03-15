import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import poleReducer from "../features/pola/polaSlice";
export const store = configureStore({
  reducer: {
    pole: poleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
