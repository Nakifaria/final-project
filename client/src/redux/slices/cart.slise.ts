import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { iCart } from '../../components/Home/itemCard';

const initialState: iCart = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initialCart: (state, action: PayloadAction<number[]>) => {
      state.items = [...action.payload];
    },

    addToCart: (state, action: PayloadAction<number>) => {
      state.items.push(action.payload);
    },

    clearCart: (state) => {
      state.items = initialState.items;
    },
  },
});

export const { addToCart, clearCart, initialCart } = cartSlice.actions;

export default cartSlice.reducer;
