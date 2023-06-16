import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IItem {
  category_id: number;
  name: string;
  price: number;
  order_count: number;
  img: string;
  description: JSON;
}

export interface ICategory {
  id: number;
  title: string;
  Items: IItem[];
}

export interface IAllItems {
  items: ICategory[];
}

const initialState: IAllItems = {
  items: [],
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ICategory[]>) => {
      state.items = [...action.payload];
    },
  },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
