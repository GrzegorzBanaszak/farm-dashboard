import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import PolaState from "./types/PolaState";
import { polaThunk } from "./polaThunk";
import mapToRecord from "../../utils/mapToRecord";
import PolaSchema from "./types/PolaSchema";

const initialState: PolaState = {
  pola: {
    data: {},
    state: { loading: true, error: false, messages: [] },
  },
  poleDetails: {
    data: {
      id: "",
      name: "",
      size: 0,
      location: "",
    },
    state: { loading: true, error: false, messages: [] },
  },
  poleCreateState: { loading: false, error: false, messages: [] },
  poleUpdateState: { loading: false, error: false, messages: [] },
  poleRemoveState: { loading: false, error: false, messages: [] },
};

const polaSlice = createSlice({
  name: "pola",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<PolaState>) => {
    //Pobieranie wszystkich pol
    builder
      .addCase(polaThunk.getAll.fulfilled, (state, action) => {
        state.pola.data = mapToRecord<PolaSchema>(action.payload);
        state.pola.state = { loading: false, error: false, messages: [] };
      })
      .addCase(polaThunk.getAll.rejected, (state, _) => {
        state.pola.data = {};
        state.pola.state = {
          loading: false,
          error: true,
          messages: [],
        };
      });

    //Pobieranie pojedynczej pola
    builder
      .addCase(polaThunk.getOne.fulfilled, (state, action) => {
        state.poleDetails.data = action.payload;
        state.poleDetails.state = {
          loading: false,
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
        };
        console.log(actions);
        state.poleDetails.state = {
          loading: false,
          error: true,
          messages: [actions.payload as string],
        };
      });

    //Dodawanie pola
    builder
      .addCase(polaThunk.create.fulfilled, (state, action) => {
        state.pola.data[action.payload.id] = action.payload;
        state.poleCreateState = { loading: false, error: false, messages: [] };
      })
      .addCase(polaThunk.create.rejected, (state, actions) => {
        state.poleCreateState = {
          loading: false,
          error: true,
          messages: [...(actions.payload as string[])],
        };
      });
    //Edycja pola
    builder
      .addCase(polaThunk.update.fulfilled, (state, action) => {
        state.pola.data[action.payload.id] = action.payload;
        state.poleUpdateState = { loading: false, error: false, messages: [] };
      })
      .addCase(polaThunk.update.rejected, (state, actions) => {
        state.poleUpdateState = {
          loading: false,
          error: true,
          messages: [...(actions.payload as string[])],
        };
      });
    //Usuwanie pola
    builder
      .addCase(polaThunk.remove.fulfilled, (state, action) => {
        delete state.pola.data[action.payload.id];
        state.poleRemoveState = { loading: false, error: false, messages: [] };
      })
      .addCase(polaThunk.remove.rejected, (state, actions) => {
        state.poleRemoveState = {
          loading: false,
          error: true,
          messages: [...(actions.payload as string[])],
        };
      });
  },
});

export const {} = polaSlice.actions;
export default polaSlice.reducer;
