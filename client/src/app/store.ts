import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import poleReducer from "../features/pola/polaSlice";
import maszynyReducer from "../features/maszyny/maszynySlice";
export const store = configureStore({
  reducer: {
    pole: poleReducer,
    maszyny: maszynyReducer,
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
