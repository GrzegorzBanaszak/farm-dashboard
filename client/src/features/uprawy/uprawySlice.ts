import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import LoadingState from "../../types/LoadingState";
import UprawyState from "./types/UprawyState";
import { uprawyThunk } from "./uprawyThunk";
import UprawySchema from "./types/UprawySchema";
import mapToRecord from "../../utils/mapToRecord";

const initialState: UprawyState = {
  uprawy: {
    data: {},
    state: { loading: LoadingState.IDLE, error: false, messages: [] },
  },
  uprawyDetails: {
    data: {
      id: "",
      type: "",
      plantedAt: "",
      harvestedAt: "",
      yield: 0,
      field: null,
    },
    state: { loading: LoadingState.IDLE, error: false, messages: [] },
  },
  uprawyCreateState: { loading: LoadingState.IDLE, error: false, messages: [] },
  uprawyUpdateState: { loading: LoadingState.IDLE, error: false, messages: [] },
  uprawyRemoveState: { loading: LoadingState.IDLE, error: false, messages: [] },
};

const uprawySlice = createSlice({
  name: "uprawy",
  initialState,
  reducers: {
    clearUprawyAddState: state => {
      state.uprawyCreateState = {
        loading: LoadingState.IDLE,
        error: false,
        messages: [],
      };
    },
    clearUprawyEditState: state => {
      state.uprawyUpdateState = {
        loading: LoadingState.IDLE,
        error: false,
        messages: [],
      };
    },
    clearUprawyRemoveState: state => {
      state.uprawyRemoveState = {
        loading: LoadingState.IDLE,
        error: false,
        messages: [],
      };
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UprawyState>) => {
    //Pobieranie wszystkich upraw
    builder
      .addCase(uprawyThunk.getAll.pending, (state, _) => {
        state.uprawy.state.loading = LoadingState.PENDING;
      })
      .addCase(uprawyThunk.getAll.fulfilled, (state, action) => {
        state.uprawy.data = mapToRecord<UprawySchema>(action.payload);
        state.uprawy.state.loading = LoadingState.SUCCEEDED;
        state.uprawyUpdateState.messages = [];
      })
      .addCase(uprawyThunk.getAll.rejected, (state, action) => {
        state.uprawy.data = {};
        state.uprawy.state.loading = LoadingState.FAILED;
        state.uprawy.state.messages = [action.payload as string];
      });

    //Pobieranie pojedynczej uprawy
    builder
      .addCase(uprawyThunk.getOne.pending, (state, _) => {
        state.uprawyDetails.state.loading = LoadingState.PENDING;
      })
      .addCase(uprawyThunk.getOne.fulfilled, (state, action) => {
        state.uprawyDetails.data = action.payload;
        state.uprawyDetails.state.loading = LoadingState.SUCCEEDED;
        state.uprawyUpdateState.messages = [];
      })
      .addCase(uprawyThunk.getOne.rejected, (state, action) => {
        state.uprawyDetails.data = {
          id: "",
          type: "",
          plantedAt: "",
          harvestedAt: "",
          yield: 0,
          field: null,
        };
        state.uprawyDetails.state.loading = LoadingState.FAILED;
        state.uprawyDetails.state.messages = [action.payload as string];
      });

    //Dodawanie uprawy
    builder
      .addCase(uprawyThunk.create.pending, (state, _) => {
        state.uprawyCreateState.loading = LoadingState.PENDING;
      })
      .addCase(uprawyThunk.create.fulfilled, (state, action) => {
        state.uprawy.data[action.payload.id] = action.payload;
        state.uprawyCreateState.loading = LoadingState.SUCCEEDED;
        state.uprawyUpdateState.messages = [];
      })
      .addCase(uprawyThunk.create.rejected, (state, action) => {
        state.uprawyCreateState.loading = LoadingState.FAILED;
        state.uprawyCreateState.messages = [action.payload as string];
      });

    //Aktualizacja uprawy
    builder
      .addCase(uprawyThunk.update.pending, (state, _) => {
        state.uprawyUpdateState.loading = LoadingState.PENDING;
      })
      .addCase(uprawyThunk.update.fulfilled, (state, action) => {
        state.uprawy.data[action.payload.id] = action.payload;
        state.uprawyUpdateState.loading = LoadingState.SUCCEEDED;
        state.uprawyUpdateState.messages = [];
      })
      .addCase(uprawyThunk.update.rejected, (state, action) => {
        state.uprawyUpdateState.loading = LoadingState.FAILED;
        state.uprawyUpdateState.messages = [action.payload as string];
      });

    //Usuwanie uprawy
    builder
      .addCase(uprawyThunk.remove.pending, (state, _) => {
        state.uprawyRemoveState.loading = LoadingState.PENDING;
      })
      .addCase(uprawyThunk.remove.fulfilled, (state, action) => {
        delete state.uprawy.data[action.payload.id];
        state.uprawyRemoveState.loading = LoadingState.SUCCEEDED;
        state.uprawyUpdateState.messages = [];
      })
      .addCase(uprawyThunk.remove.rejected, (state, action) => {
        state.uprawyRemoveState.loading = LoadingState.FAILED;
        state.uprawyRemoveState.messages = [action.payload as string];
      });
  },
});

export const {
  clearUprawyAddState,
  clearUprawyEditState,
  clearUprawyRemoveState,
} = uprawySlice.actions;
export default uprawySlice.reducer;
