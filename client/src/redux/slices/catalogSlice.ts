import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CatalogType, CategoryType, ItemType, StateType } from "../../types/catalogTypes"



const initialState: StateType = {
    catalog: [],
    category: [],
    item: {}
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
           setCatalog: (state, action: PayloadAction<CatalogType[]>) => ({
            ...state,
            catalog: action.payload
           }),
           setCategory: (state, action: PayloadAction<CategoryType[]>) => ({
            ...state,
            category: action.payload
           }),
           setItem: (state, action: PayloadAction<ItemType>) => ({
            ...state,
            item: action.payload
           })
    }
})

export const {setCatalog, setCategory, setItem} = catalogSlice.actions

export default catalogSlice.reducer