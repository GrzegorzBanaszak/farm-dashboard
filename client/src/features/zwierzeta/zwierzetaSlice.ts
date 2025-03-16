import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import ZwierzetaState from "@/features/zwierzeta/types/ZwierzetaState";
import LoadingState from "@/types/LoadingState";
import ZwierzetaSchema from "./types/ZwierzetaSchema";
import mapToRecord from "@/utils/mapToRecord";
import { zwierzetaThunk } from "./zwierzetaThunk";

const initialState: ZwierzetaState = {
  zwierzeta: {
    data: {},
    state: { loading: LoadingState.IDLE, error: false, messages: [] },
  },
  zwierzetaDetails: {
    data: {
      id: "",
      name: "",
      specie: "",
      birthDate: "",
      health: "",
      number: 0,
    },
    state: { loading: LoadingState.IDLE, error: false, messages: [] },
  },
  zwierzetaCreateState: {
    loading: LoadingState.IDLE,
    error: false,
    messages: [],
  },
  zwierzetaUpdateState: {
    loading: LoadingState.IDLE,
    error: false,
    messages: [],
  },
  zwierzetaRemoveState: {
    loading: LoadingState.IDLE,
    error: false,
    messages: [],
  },
  zwierzetaHealthUpdateState: {
    loading: LoadingState.IDLE,
    error: false,
    messages: [],
  },
};

const zwierzetaSlice = createSlice({
  name: "zwierzeta",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ZwierzetaState>) => {
    //Pobieranie wszystkich zwierzat
    builder
      .addCase(zwierzetaThunk.getAll.pending, (state, _) => {
        state.zwierzeta.state.loading = LoadingState.PENDING;
      })
      .addCase(zwierzetaThunk.getAll.fulfilled, (state, action) => {
        state.zwierzeta.data = mapToRecord<ZwierzetaSchema>(action.payload);
        state.zwierzeta.state.loading = LoadingState.SUCCEEDED;
        state.zwierzetaUpdateState.messages = [];
      })
      .addCase(zwierzetaThunk.getAll.rejected, (state, action) => {
        state.zwierzeta.data = {};
        state.zwierzeta.state.loading = LoadingState.FAILED;
        state.zwierzeta.state.messages = [action.payload as string];
      });

    //Pobieranie pojedynczej zwierzat
    builder
      .addCase(zwierzetaThunk.getOne.pending, (state, _) => {
        state.zwierzetaDetails.state.loading = LoadingState.PENDING;
      })
      .addCase(zwierzetaThunk.getOne.fulfilled, (state, action) => {
        state.zwierzetaDetails.data = action.payload;
        state.zwierzetaDetails.state.loading = LoadingState.SUCCEEDED;
        state.zwierzetaUpdateState.messages = [];
      })
      .addCase(zwierzetaThunk.getOne.rejected, (state, action) => {
        state.zwierzetaDetails.data = {
          id: "",
          name: "",
          specie: "",
          birthDate: "",
          health: "",
          number: 0,
        };
        state.zwierzetaDetails.state.loading = LoadingState.FAILED;
        state.zwierzetaDetails.state.messages = [action.payload as string];
      });

    //Tworzenie zwierzat
    builder
      .addCase(zwierzetaThunk.create.pending, (state, _) => {
        state.zwierzetaCreateState.loading = LoadingState.PENDING;
      })
      .addCase(zwierzetaThunk.create.fulfilled, (state, action) => {
        state.zwierzeta.data[action.payload.id] = action.payload;
        state.zwierzetaCreateState.loading = LoadingState.SUCCEEDED;
        state.zwierzetaCreateState.messages = [];
      })
      .addCase(zwierzetaThunk.create.rejected, (state, action) => {
        state.zwierzetaCreateState.loading = LoadingState.FAILED;
        state.zwierzetaCreateState.messages = [action.payload as string];
      });

    //Aktualizacja zwierzat
    builder
      .addCase(zwierzetaThunk.update.pending, (state, _) => {
        state.zwierzetaUpdateState.loading = LoadingState.PENDING;
      })
      .addCase(zwierzetaThunk.update.fulfilled, (state, action) => {
        state.zwierzeta.data[action.payload.id] = action.payload;
        state.zwierzetaUpdateState.loading = LoadingState.SUCCEEDED;
        state.zwierzetaUpdateState.messages = [];
      })
      .addCase(zwierzetaThunk.update.rejected, (state, action) => {
        state.zwierzetaUpdateState.loading = LoadingState.FAILED;
        state.zwierzetaUpdateState.messages = [action.payload as string];
      });

    //Usuwanie zwierzat
    builder
      .addCase(zwierzetaThunk.remove.pending, (state, _) => {
        state.zwierzetaRemoveState.loading = LoadingState.PENDING;
      })
      .addCase(zwierzetaThunk.remove.fulfilled, (state, action) => {
        delete state.zwierzeta.data[action.payload.id];
        state.zwierzetaRemoveState.loading = LoadingState.SUCCEEDED;
        state.zwierzetaRemoveState.messages = [];
      })
      .addCase(zwierzetaThunk.remove.rejected, (state, action) => {
        state.zwierzetaRemoveState.loading = LoadingState.FAILED;
        state.zwierzetaRemoveState.messages = [action.payload as string];
      });

    //Aktualizacja stanu zdrowia zwierzat
    builder
      .addCase(zwierzetaThunk.updateHealth.pending, (state, _) => {
        state.zwierzetaHealthUpdateState.loading = LoadingState.PENDING;
      })
      .addCase(zwierzetaThunk.updateHealth.fulfilled, (state, action) => {
        state.zwierzeta.data[action.payload.id] = action.payload;
        state.zwierzetaHealthUpdateState.loading = LoadingState.SUCCEEDED;
        state.zwierzetaHealthUpdateState.messages = [];
      })
      .addCase(zwierzetaThunk.updateHealth.rejected, (state, action) => {
        state.zwierzetaHealthUpdateState.loading = LoadingState.FAILED;
        state.zwierzetaHealthUpdateState.messages = [action.payload as string];
      });
  },
});

export const {} = zwierzetaSlice.actions;
export default zwierzetaSlice.reducer;
