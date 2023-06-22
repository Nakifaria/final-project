import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IItemsPrice {
  id: number;
  count?: number;
  price: number;
}

export interface ICartPrice {
  items: IItemsPrice[];
}

const initialState: ICartPrice = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initialCart: (state, action: PayloadAction<ICartPrice>) => {
      state.items = [...action.payload.items];
    },

    addToCart: (state, action: PayloadAction<IItemsPrice>) => {
      state.items.push(action.payload);
    },

    deleteFromCart: (state, action: PayloadAction<IItemsPrice>) => {
      const spliceIndex = state.items.indexOf(action.payload);

      state.items.splice(spliceIndex, 1);
    },

    deleteFromCartById: (state, action: PayloadAction<IItemsPrice>) => {
      state.items = [
        ...state.items.filter((el) => el.id !== action.payload.id),
      ];
    },

    clearCart: (state) => {
      state.items = initialState.items;
    },
  },
});

export const {
  addToCart,
  clearCart,
  initialCart,
  deleteFromCart,
  deleteFromCartById,
} = cartSlice.actions;

export default cartSlice.reducer;
