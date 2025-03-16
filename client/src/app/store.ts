import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import poleReducer from "../features/pola/polaSlice";
import maszynyReducer from "../features/maszyny/maszynySlice";
import uprawyReducer from "../features/uprawy/uprawySlice";
import zwierzetaReducer from "../features/zwierzeta/zwierzetaSlice";

export const store = configureStore({
  reducer: {
    pole: poleReducer,
    maszyny: maszynyReducer,
    uprawy: uprawyReducer,
    zwierzeta: zwierzetaReducer,
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
