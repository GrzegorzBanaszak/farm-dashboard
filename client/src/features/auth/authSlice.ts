import LoadingState from "@/types/LoadingState";
import AuthState from "./types/AuthState";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  registerState: { loading: LoadingState.IDLE, error: false, messages: [] },
  loginState: { loading: LoadingState.IDLE, error: false, messages: [] },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
