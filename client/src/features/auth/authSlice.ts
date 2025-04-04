import LoadingState from "@/types/LoadingState";
import AuthState from "./types/AuthState";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { authThunk } from "./authThunk";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  globalState: { loading: LoadingState.IDLE, error: false, messages: [] },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: state => {
      state.globalState = {
        loading: LoadingState.IDLE,
        error: false,
        messages: [],
      };
      state.user = null;
      state.isAuthenticated = false;
    },
    cleanError: state => {
      state.globalState.error = false;
      state.globalState.messages = [];
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      .addCase(authThunk.login.pending, (state, _) => {
        state.globalState.loading = LoadingState.PENDING;
      })
      .addCase(authThunk.login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.globalState.loading = LoadingState.SUCCEEDED;
        state.isAuthenticated = true;
      })
      .addCase(authThunk.login.rejected, (state, action) => {
        state.globalState.loading = LoadingState.FAILED;
        state.globalState.error = true;
        state.globalState.messages = [action.payload as string];
        state.isAuthenticated = false;
      });

    builder
      .addCase(authThunk.register.pending, (state, _) => {
        state.globalState.loading = LoadingState.PENDING;
      })
      .addCase(authThunk.register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.globalState.loading = LoadingState.SUCCEEDED;
        state.isAuthenticated = true;
      })
      .addCase(authThunk.register.rejected, (state, action) => {
        state.globalState.loading = LoadingState.FAILED;
        state.globalState.error = true;
        state.globalState.messages = [action.payload as string];
        state.isAuthenticated = false;
      });

    builder
      .addCase(authThunk.getUser.pending, (state, _) => {
        state.globalState.loading = LoadingState.PENDING;
      })
      .addCase(authThunk.getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.globalState.loading = LoadingState.SUCCEEDED;
        state.isAuthenticated = true;
      })
      .addCase(authThunk.getUser.rejected, (state, action) => {
        state.globalState.loading = LoadingState.FAILED;
        state.globalState.error = true;
        state.globalState.messages = [action.payload as string];
        state.isAuthenticated = false;
      });

    //Wylogowanie
    builder.addCase(authThunk.logout.fulfilled, (state, _) => {
      state.globalState.loading = LoadingState.SUCCEEDED;
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { resetAuthState, cleanError } = authSlice.actions;
export default authSlice.reducer;
