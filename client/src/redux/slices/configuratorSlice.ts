import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { configuratorSliceType } from "../../types/configurator.types";

const initialState: configuratorSliceType = {
  categoriesArr: [],
  primaryParts: 0,
  primaryPartsTotalAmount: 0,
  progressbarStyle: { width: "0" },
  choosenCategoryArr: [],
  openModal: false,
  categoryId: 0,
  significance: 0,
  categoryTitle: "",
  choosenItem: [],
};

export const configuratorSlice: Slice = createSlice({
  name: "configurator",
  initialState,
  reducers: {
    setCategoriesArr: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      categoriesArr: action.payload,
    }),
    setPrimaryParts: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      primaryParts: action.payload,
    }),
    setPrimaryPartsTotalAmount: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      primaryPartsTotalAmount: action.payload,
    }),
    setProgressbarStyle: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      progressbarStyle: action.payload,
    }),
    setChoosenCategoryArr: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      choosenCategoryArr: action.payload,
    }),
    setOpenModal: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      openModal: action.payload,
    }),
    setCategoryId: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      categoryId: action.payload,
    }),
    setSignificance: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      significance: action.payload,
    }),
    setCategoryTitle: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      categoryTitle: action.payload,
    }),
    setChoosenItem: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      choosenItem: action.payload,
    }),
  },
});

export const {
  setCategoriesArr,
  setPrimaryParts,
  setPrimaryPartsTotalAmount,
  setProgressbarStyle,
  setChoosenCategoryArr,
  setOpenModal,
  setCategoryId,
  setSignificance,
  setCategoryTitle,
  setChoosenItem,
} = configuratorSlice.actions;

export default configuratorSlice.reducer;
