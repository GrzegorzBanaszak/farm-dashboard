import { createAsyncThunk } from "@reduxjs/toolkit";
import { maszynyService } from "./maszynyService";
import AddMaszynySchema from "./types/AddMaszynySchema";
import UpdateMaszynySchema from "./types/UpdateMaszynySchema";
import { MachineCondition } from "./types/MachineCondition";

const getAll = createAsyncThunk("maszyny/getAll", async (_, thunkAPI) => {
  try {
    const data = await maszynyService.getAll();
    return data;
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const getOne = createAsyncThunk(
  "maszyny/getOne",
  async (id: string, thunkAPI) => {
    try {
      const data = await maszynyService.getOne(id);
      return data;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const create = createAsyncThunk(
  "maszyny/create",
  async (data: AddMaszynySchema, thunkAPI) => {
    try {
      const resData = await maszynyService.create(data);
      return resData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const update = createAsyncThunk(
  "maszyny/update",
  async (data: { id: string; data: UpdateMaszynySchema }, thunkAPI) => {
    try {
      const resData = await maszynyService.update(data.id, data.data);
      return resData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const remove = createAsyncThunk(
  "maszyny/delete",
  async (id: string, thunkAPI) => {
    try {
      const resData = await maszynyService.remove(id);
      return resData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const updateMachineCondition = createAsyncThunk(
  "maszyny/updateMachineCondition",
  async (
    data: { id: string; data: { condition: MachineCondition } },
    thunkAPI
  ) => {
    try {
      const resData = await maszynyService.updateMachineCondition(data.id, {
        condition: data.data.condition,
      });
      return resData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const maszynyThunk = {
  getAll,
  getOne,
  create,
  update,
  remove,
  updateMachineCondition,
};
