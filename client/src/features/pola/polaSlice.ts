import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import PolaState from "./types/PolaState";
import { polaThunk } from "./polaThunk";
import mapToRecord from "../../utils/mapToRecord";
import PolaSchema from "./types/PolaSchema";
import LoadingState from "../../types/LoadingState";

const initialState: PolaState = {
  pola: {
    data: {},
    state: { loading: LoadingState.IDLE, error: false, messages: [] },
  },
  poleDetails: {
    data: {
      id: "",
      name: "",
      size: 0,
      location: "",
      currentCropGrowing: null,
      histroyCrops: [],
    },
    state: { loading: LoadingState.IDLE, error: false, messages: [] },
  },
  poleCreateState: { loading: LoadingState.IDLE, error: false, messages: [] },
  poleUpdateState: { loading: LoadingState.IDLE, error: false, messages: [] },
  poleRemoveState: { loading: LoadingState.IDLE, error: false, messages: [] },
};

const polaSlice = createSlice({
  name: "pola",
  initialState,
  reducers: {
    clearPoleAddState: state => {
      state.poleCreateState = {
        loading: LoadingState.IDLE,
        error: false,
        messages: [],
      };
    },
    clearEditState: state => {
      state.poleUpdateState = {
        loading: LoadingState.IDLE,
        error: false,
        messages: [],
      };
    },
    clearPoleDeleteState: state => {
      state.poleRemoveState = {
        loading: LoadingState.IDLE,
        error: false,
        messages: [],
      };
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<PolaState>) => {
    //Pobieranie wszystkich pol
    builder
      .addCase(polaThunk.getAll.pending, (state, _) => {
        state.pola.state = {
          loading: LoadingState.PENDING,
          error: false,
          messages: [],
        };
      })
      .addCase(polaThunk.getAll.fulfilled, (state, action) => {
        state.pola.data = mapToRecord<PolaSchema>(action.payload);
        state.pola.state = {
          loading: LoadingState.SUCCEEDED,
          error: false,
          messages: [],
        };
      })
      .addCase(polaThunk.getAll.rejected, (state, _) => {
        state.pola.data = {};
        state.pola.state = {
          loading: LoadingState.FAILED,
          error: true,
          messages: [],
        };
      });

    //Pobieranie pojedynczej pola
    builder
      .addCase(polaThunk.getOne.pending, (state, _) => {
        state.poleDetails.state = {
          loading: LoadingState.PENDING,
          error: false,
          messages: [],
        };
      })
      .addCase(polaThunk.getOne.fulfilled, (state, action) => {
        state.poleDetails.data = action.payload;
        state.poleDetails.state = {
          loading: LoadingState.SUCCEEDED,
          error: false,
          messages: [],
        };
      })
      .addCase(polaThunk.getOne.rejected, (state, actions) => {
        state.poleDetails.data = {
          id: "",
          name: "",
          size: 0,
          location: "",
          currentCropGrowing: null,
          histroyCrops: [],
        };
        state.poleDetails.state = {
          loading: LoadingState.FAILED,
          error: true,
          messages: [actions.payload as string],
        };
      });

    //Dodawanie pola

    builder
      .addCase(polaThunk.create.pending, (state, _) => {
        state.poleCreateState = {
          loading: LoadingState.PENDING,
          error: false,
          messages: [],
        };
      })
      .addCase(polaThunk.create.fulfilled, (state, action) => {
        state.pola.data[action.payload.id] = action.payload;
        state.poleCreateState = {
          loading: LoadingState.SUCCEEDED,
          error: false,
          messages: [],
        };
      })
      .addCase(polaThunk.create.rejected, (state, actions) => {
        state.poleCreateState = {
          loading: LoadingState.FAILED,
          error: true,
          messages: [...(actions.payload as string[])],
        };
      });
    //Edycja pola
    builder
      .addCase(polaThunk.update.pending, (state, _) => {
        state.poleUpdateState = {
          loading: LoadingState.PENDING,
          error: false,
          messages: [],
        };
      })
      .addCase(polaThunk.update.fulfilled, (state, _) => {
        state.poleUpdateState = {
          loading: LoadingState.SUCCEEDED,
          error: false,
          messages: [],
        };
      })
      .addCase(polaThunk.update.rejected, (state, actions) => {
        state.poleUpdateState = {
          loading: LoadingState.FAILED,
          error: true,
          messages: [...(actions.payload as string[])],
        };
      });
    //Usuwanie pola
    builder
      .addCase(polaThunk.remove.fulfilled, (state, action) => {
        delete state.pola.data[action.payload.id];
        state.poleRemoveState = {
          loading: LoadingState.SUCCEEDED,
          error: false,
          messages: [],
        };
      })
      .addCase(polaThunk.remove.rejected, (state, actions) => {
        state.poleRemoveState = {
          loading: LoadingState.FAILED,
          error: true,
          messages: [...(actions.payload as string[])],
        };
      });
  },
});

export const { clearEditState, clearPoleDeleteState, clearPoleAddState } =
  polaSlice.actions;
export default polaSlice.reducer;
