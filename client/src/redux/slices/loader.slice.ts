import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ILoader {
  load: boolean;
}

const initialState: ILoader = {
  load: false,
};

export const loaderSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    startLoad: (state, action: PayloadAction<boolean>) => {
      state.load = action.payload;
    },
    endLoad: (state) => {
      state.load = false;
    },
  },
});

export const { startLoad, endLoad } = loaderSlice.actions;

export default loaderSlice.reducer;
