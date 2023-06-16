import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { StateType, ItemType } from "../../types/catalogTypes"

const initialState: ItemType = {
    items: []
}

export const favSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
           setItems: (state, action) => ({
            ...state,
            items: action.payload
           })
           
           
    }
})

export const {setItems} = favSlice.actions

export default favSlice.reducer