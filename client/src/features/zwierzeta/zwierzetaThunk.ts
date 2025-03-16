import { createAsyncThunk } from "@reduxjs/toolkit";
import { zwierzetaService } from "./zwierzetaService";
import AddZwierzetaSchema from "./types/AddZwierzetaSchema";
import UpdateZwierzetaSchema from "./types/UpdateZwierzetaSchema";
import { ZwierzetaHealthStatus } from "./types/ZwierzetaHealthStatus";

const getAll = createAsyncThunk("zwierzeta/getAll", async (_, thunkAPI) => {
  try {
    const resData = await zwierzetaService.getAll();
    return resData;
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const getOne = createAsyncThunk(
  "zwierzeta/getOne",
  async (id: string, thunkAPI) => {
    try {
      const resData = await zwierzetaService.getOne(id);
      return resData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const create = createAsyncThunk(
  "zwierzeta/create",
  async (data: AddZwierzetaSchema, thunkAPI) => {
    try {
      const resData = await zwierzetaService.create(data);
      return resData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const update = createAsyncThunk(
  "zwierzeta/update",
  async (
    data: { id: string; dataToUpdate: UpdateZwierzetaSchema },
    thunkAPI
  ) => {
    try {
      const resData = await zwierzetaService.update(data.id, data.dataToUpdate);
      return resData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const remove = createAsyncThunk(
  "zwierzeta/delete",
  async (id: string, thunkAPI) => {
    try {
      const resData = await zwierzetaService.remove(id);
      return resData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const updateHealth = createAsyncThunk(
  "zwierzeta/updateStatus",
  async (
    data: { id: string; data: { status: ZwierzetaHealthStatus } },
    thunkAPI
  ) => {
    try {
      const resData = await zwierzetaService.updateHealth(data.id, data.data);
      return resData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const zwierzetaThunk = {
  getAll,
  getOne,
  create,
  update,
  remove,
  updateHealth,
};
