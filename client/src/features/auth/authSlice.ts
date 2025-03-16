import LoadingState from "@/types/LoadingState";
import AuthState from "./types/AuthState";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { authThunk } from "./authThunk";

const initialState: AuthState = {
  user: null,
  registerState: { loading: LoadingState.IDLE, error: false, messages: [] },
  loginState: { loading: LoadingState.IDLE, error: false, messages: [] },
  getUserState: { loading: LoadingState.IDLE, error: false, messages: [] },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.registerState = {
        loading: LoadingState.IDLE,
        error: false,
        messages: [],
      };
      state.loginState = {
        loading: LoadingState.IDLE,
        error: false,
        messages: [],
      };
      state.getUserState = {
        loading: LoadingState.IDLE,
        error: false,
        messages: [],
      };
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      .addCase(authThunk.login.pending, (state, _) => {
        state.loginState.loading = LoadingState.PENDING;
      })
      .addCase(authThunk.login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginState.loading = LoadingState.SUCCEEDED;
      })
      .addCase(authThunk.login.rejected, (state, action) => {
        state.loginState.loading = LoadingState.FAILED;
        state.loginState.error = true;
        state.loginState.messages = [action.payload as string];
      });

    builder
      .addCase(authThunk.register.pending, (state, _) => {
        state.registerState.loading = LoadingState.PENDING;
      })
      .addCase(authThunk.register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registerState.loading = LoadingState.SUCCEEDED;
      })
      .addCase(authThunk.register.rejected, (state, action) => {
        state.registerState.loading = LoadingState.FAILED;
        state.registerState.error = true;
        state.registerState.messages = [action.payload as string];
      });

    builder
      .addCase(authThunk.getUser.pending, (state, _) => {
        state.getUserState.loading = LoadingState.PENDING;
      })
      .addCase(authThunk.getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.getUserState.loading = LoadingState.SUCCEEDED;
      })
      .addCase(authThunk.getUser.rejected, (state, action) => {
        state.getUserState.loading = LoadingState.FAILED;
        state.getUserState.error = true;
        state.getUserState.messages = [action.payload as string];
      });

    //Wylogowanie
    builder.addCase(authThunk.logout.fulfilled, (state, _) => {
      state.user = null;
    });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
