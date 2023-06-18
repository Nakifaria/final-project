import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IPackItems {
  cart: number[];
  compare: number[];
  favourite: number[];
}

export interface IHowToPack {
  items: number[];
  packName: 'cart' | 'compare' | 'favourite';
}

export interface IItemToPack {
  itemId: number;
  packName: 'cart' | 'compare' | 'favourite';
}

const initialState: IPackItems = {
  cart: [],
  compare: [],
  favourite: [],
};

export const PackItemsSlice = createSlice({
  name: 'pack',
  initialState,
  reducers: {
    initial: (state, action: PayloadAction<IHowToPack>) => {
      switch (action.payload.packName) {
        case 'cart':
          state.cart = [...action.payload.items];
          break;
        case 'compare':
          state.compare = [...action.payload.items];
          break;
        case 'favourite':
          state.favourite = [...action.payload.items];
          break;
      }
    },

    addTo: (state, action: PayloadAction<IItemToPack>) => {
      switch (action.payload.packName) {
        case 'cart':
          state.cart.push(action.payload.itemId);
          break;
        case 'compare':
          state.compare.push(action.payload.itemId);
          break;
        case 'favourite':
          state.favourite.push(action.payload.itemId);
          break;
      }
    },

    deleteFrom: (state, action: PayloadAction<IItemToPack>) => {
      switch (action.payload.packName) {
        case 'cart':
          state.cart.splice(state.cart.indexOf(action.payload.itemId), 1);
          break;
        case 'compare':
          state.compare.splice(state.compare.indexOf(action.payload.itemId), 1);
          break;
        case 'favourite':
          state.favourite.splice(
            state.favourite.indexOf(action.payload.itemId),
            1
          );
          break;
      }
    },

    clear: (state) => {
      state.cart = initialState.cart;
      state.compare = initialState.compare;
      state.favourite = initialState.favourite;
    },
  },
});

export const { initial, addTo, deleteFrom, clear } = PackItemsSlice.actions;

export default PackItemsSlice.reducer;
