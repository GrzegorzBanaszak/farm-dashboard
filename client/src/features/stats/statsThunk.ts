import { createAsyncThunk } from "@reduxjs/toolkit";
import { statsService } from "./statsService";

const getStats = createAsyncThunk("stats/getStats", async (_, thunkAPI) => {
  try {
    const resData = await statsService.getStats();
    return resData;
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const statsThunk = { getStats };
