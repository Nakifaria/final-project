import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CatalogType, CategoryType, StateType } from "../../types/catalogTypes"



const initialState: StateType = {
    catalog: [],
    category: []
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
           })
    }
})

export const {setCatalog, setCategory} = catalogSlice.actions

export default catalogSlice.reducer