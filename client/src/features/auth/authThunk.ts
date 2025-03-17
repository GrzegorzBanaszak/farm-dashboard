import { createAsyncThunk } from "@reduxjs/toolkit";
import LoginSchema from "./types/LoginSchema";
import { authService } from "./authService";
import RegisterSchema from "./types/RegisterSchema";

const login = createAsyncThunk(
  "auth/login",
  async (data: LoginSchema, thunkAPI) => {
    try {
      const res = authService.login(data);

      return res;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const register = createAsyncThunk(
  "auth/register",
  async (data: RegisterSchema, thunkAPI) => {
    try {
      const res = authService.register(data);
      return res;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const res = authService.getUser();
    return res;
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = authService.logout();
    return res;
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authThunk = { login, register, getUser, logout };
