import { createAsyncThunk } from "@reduxjs/toolkit";
import { polaService } from "./polaService";
import AddPoleSchema from "./types/AddPoleSchema";
import EditPoleSchema from "./types/EditPoleSchema";

//Pobranie wszystkich pol
const getAll = createAsyncThunk("pola/getAll", async (_, thunkAPI) => {
  try {
    const data = await polaService.getAll();
    return data;
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const getOne = createAsyncThunk("pola/getOne", async (id: string, thunkAPI) => {
  try {
    const data = await polaService.getOne(id);
    return data;
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const create = createAsyncThunk(
  "pola/create",
  async (data: AddPoleSchema, thunkAPI) => {
    try {
      const responseData = await polaService.create(data);
      return responseData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const update = createAsyncThunk(
  "pola/update",
  async (data: { id: string; data: EditPoleSchema }, thunkAPI) => {
    try {
      const responseData = await polaService.update(data.id, data.data);
      return responseData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const remove = createAsyncThunk("pola/remove", async (id: string, thunkAPI) => {
  try {
    const responseData = await polaService.remove(id);
    return responseData;
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const polaThunk = { getAll, getOne, create, update, remove };
