import { createAsyncThunk } from "@reduxjs/toolkit";
import { uprawyService } from "./uprawyService";
import AddUprawySchema from "./types/AddUprawySchema";
import UpdateUprawySchema from "./types/UpdateUprawySchema";

const getAll = createAsyncThunk("uprawy/getAll", async (_, thunkAPI) => {
  try {
    const data = await uprawyService.getAll();
    return data;
  } catch (error: any) {
    const message =
      error.response.data.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const getOne = createAsyncThunk(
  "uprawy/getOne",
  async (id: string, thunkAPI) => {
    try {
      const data = await uprawyService.getOne(id);
      return data;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const create = createAsyncThunk(
  "uprawy/create",
  async (data: AddUprawySchema, thunkAPI) => {
    try {
      const responseData = await uprawyService.create(data);
      return responseData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const update = createAsyncThunk(
  "uprawy/update",
  async (data: { id: string; dataToUpdate: UpdateUprawySchema }, thunkAPI) => {
    try {
      const responseData = await uprawyService.update(
        data.id,
        data.dataToUpdate
      );
      return responseData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const remove = createAsyncThunk(
  "uprawy/remove",
  async (id: string, thunkAPI) => {
    try {
      const responseData = await uprawyService.remove(id);
      return responseData;
    } catch (error: any) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uprawyThunk = { getAll, getOne, create, update, remove };
