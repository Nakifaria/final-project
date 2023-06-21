import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { configuratorSliceType } from "../../types/configurator.types";

const initialState: configuratorSliceType = {
  categoriesArr: [],
  primaryParts: 0,
  primaryPartsTotalAmount: 0,
  progressbarStyle: { width: "0" },
  choosenCategory: [],
  openModal: false,
  categoryId: 0,
  significance: 0,
  categoryTitle: "",
  choosenItem: [],
  title: "",
  description: "",
  currentConfiguration: { id: 0, title: "", description: "", items: [] },
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
    setChoosenCategory: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      choosenCategory: action.payload,
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
    setTitle: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      title: action.payload,
    }),
    setDescription: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      description: action.payload,
    }),
    setCurrentConfiguration: (
      state,
      action: PayloadAction<Partial<configuratorSliceType>>
    ) => ({
      ...state,
      currentConfiguration: action.payload,
    }),
  },
});

export const {
  setCategoriesArr,
  setPrimaryParts,
  setPrimaryPartsTotalAmount,
  setProgressbarStyle,
  setChoosenCategory,
  setOpenModal,
  setCategoryId,
  setSignificance,
  setCategoryTitle,
  setChoosenItem,
  setTitle,
  setDescription,
  setCurrentConfiguration,
} = configuratorSlice.actions;

export default configuratorSlice.reducer;
