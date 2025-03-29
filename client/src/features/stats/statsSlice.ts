import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import StatsState from "./schema/StatsState";
import LoadingState from "@/types/LoadingState";
import { statsThunk } from "./statsThunk";

const initialState: StatsState = {
  data: [],
  state: { loading: LoadingState.IDLE, error: false, messages: [] },
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<StatsState>) => {
    builder
      .addCase(statsThunk.getStats.pending, (state, _) => {
        state.state.loading = LoadingState.PENDING;
      })
      .addCase(statsThunk.getStats.fulfilled, (state, action) => {
        state.data = action.payload;
        state.state.loading = LoadingState.SUCCEEDED;
      })
      .addCase(statsThunk.getStats.rejected, (state, action) => {
        state.state.loading = LoadingState.FAILED;
        state.state.error = true;
        state.state.messages = [action.payload as string];
      });
  },
});

export default statsSlice.reducer;
