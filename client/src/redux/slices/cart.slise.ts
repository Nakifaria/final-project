import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICart } from '../../components/Home/itemCard';

const initialState: ICart = {
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

    deleteFromCart: (state, action: PayloadAction<number>) => {
      const spliceIndex = state.items.indexOf(action.payload);

      state.items.splice(spliceIndex, 1);
    },

    clearCart: (state) => {
      state.items = initialState.items;
    },
  },
});

export const { addToCart, clearCart, initialCart, deleteFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
