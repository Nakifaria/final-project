import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ItemsType } from "../../types/favTypes"


const initialState: ItemsType = {
    items: []
}

export const favSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
           setFavs: (state, action) => ({
            ...state,
            items: action.payload,
           }),
           deleteFavs: (state, action) => {
            state.items = state.items.filter((item)=> item.id !== action.payload)    
    }}
})

export const {setFavs, deleteFavs} = favSlice.actions

export default favSlice.reducer