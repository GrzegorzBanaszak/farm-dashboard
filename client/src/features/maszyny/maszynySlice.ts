import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import LoadingState from "../../types/LoadingState";
import MaszynyState from "./types/MaszynyState";
import { maszynyThunk } from "./maszynyThunk";
import mapToRecord from "../../utils/mapToRecord";
import MaszynySchema from "./types/MaszynySchema";
import { MachineCondition } from "./types/MachineCondition";

const initialState: MaszynyState = {
  maszyny: {
    data: {},
    state: { loading: LoadingState.IDLE, error: false, messages: [] },
  },
  maszynaDetails: {
    data: {
      id: "",
      name: "",
      type: "",
      purchaseDate: new Date().toISOString(),
      condition: MachineCondition.NEW,
    },
    state: { loading: LoadingState.IDLE, error: false, messages: [] },
  },
  maszynaCreateState: {
    loading: LoadingState.IDLE,
    error: false,
    messages: [],
  },
  maszynaUpdateState: {
    loading: LoadingState.IDLE,
    error: false,
    messages: [],
  },
  maszynaRemoveState: {
    loading: LoadingState.IDLE,
    error: false,
    messages: [],
  },
};

const maszynySlice = createSlice({
  name: "maszyny",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<MaszynyState>) => {
    //Pobieranie wszystkich maszyn
    builder
      .addCase(maszynyThunk.getAll.pending, (state, _) => {
        state.maszyny.state.loading = LoadingState.PENDING;
      })
      .addCase(maszynyThunk.getAll.fulfilled, (state, action) => {
        state.maszyny.data = mapToRecord<MaszynySchema>(action.payload);
        state.maszyny.state.loading = LoadingState.SUCCEEDED;
      })
      .addCase(maszynyThunk.getAll.rejected, (state, _) => {
        state.maszyny.data = {};
        state.maszyny.state.loading = LoadingState.FAILED;
      });

    //Pobieranie pojedynczej maszyny
    builder
      .addCase(maszynyThunk.getOne.pending, (state, _) => {
        state.maszynaDetails.state.loading = LoadingState.PENDING;
      })
      .addCase(maszynyThunk.getOne.fulfilled, (state, action) => {
        state.maszynaDetails.data = action.payload;
        state.maszynaDetails.state.loading = LoadingState.SUCCEEDED;
      })
      .addCase(maszynyThunk.getOne.rejected, (state, _) => {
        state.maszynaDetails.data = {
          id: "",
          name: "",
          type: "",
          purchaseDate: new Date(),
          condition: MachineCondition.NEW,
        };
        state.maszynaDetails.state.loading = LoadingState.FAILED;
      });

    //Dodawanie maszyny
    builder
      .addCase(maszynyThunk.create.pending, (state, _) => {
        state.maszynaCreateState.loading = LoadingState.PENDING;
      })
      .addCase(maszynyThunk.create.fulfilled, (state, action) => {
        state.maszyny.data[action.payload.id] = action.payload;
        state.maszynaCreateState.loading = LoadingState.SUCCEEDED;
      })
      .addCase(maszynyThunk.create.rejected, (state, action) => {
        state.maszynaCreateState.messages = [...(action.payload as string[])];
        state.maszynaCreateState.loading = LoadingState.FAILED;
      });

    //Aktualizacja maszyny
    builder
      .addCase(maszynyThunk.update.pending, (state, _) => {
        state.maszynaUpdateState.loading = LoadingState.PENDING;
      })
      .addCase(maszynyThunk.update.fulfilled, (state, action) => {
        state.maszyny.data[action.payload.id] = action.payload;
        state.maszynaUpdateState.loading = LoadingState.SUCCEEDED;
      })
      .addCase(maszynyThunk.update.rejected, (state, action) => {
        state.maszynaUpdateState.messages = [action.payload as string];
        state.maszynaUpdateState.loading = LoadingState.FAILED;
      });

    //Usuwanie maszyny
    builder
      .addCase(maszynyThunk.remove.pending, (state, _) => {
        state.maszynaRemoveState.loading = LoadingState.PENDING;
      })
      .addCase(maszynyThunk.remove.fulfilled, (state, action) => {
        delete state.maszyny.data[action.payload.id];
        state.maszynaRemoveState.loading = LoadingState.SUCCEEDED;
      })
      .addCase(maszynyThunk.remove.rejected, (state, action) => {
        state.maszynaRemoveState.messages = [action.payload as string];
        state.maszynaRemoveState.loading = LoadingState.FAILED;
      });

    //Aktualizacja kondycji maszyny
    builder.addCase(
      maszynyThunk.updateMachineCondition.fulfilled,
      (state, action) => {
        if (!state.maszyny.data[action.payload.id]) return;
        state.maszyny.data[action.payload.id].condition =
          action.payload.condition;
      }
    );
  },
});

export const {} = maszynySlice.actions;
export default maszynySlice.reducer;
