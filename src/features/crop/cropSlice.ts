import { Crop } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CropState {
  crops: Crop[];
}

const initialState: CropState = { crops: [] };

export const cropSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
});

export const {} = cropSlice.actions;
export default cropSlice.reducer;
