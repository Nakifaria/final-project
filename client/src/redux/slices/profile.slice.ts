import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IProfileConfig {
    id: number,
    title: string;
    createdAt: string
  }

  export interface IOrderConfig {
    id: number;
    total_price: number;
    createdAt: string
  }

export interface IProfileState {
    userConfigs: IProfileConfig [];
    userOrders: IOrderConfig []
  }

const initialState: IProfileState = {
    userConfigs: [],
    userOrders: []
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
           setUserConfig: (state, action: PayloadAction<IProfileConfig[]>) => ({
            ...state,
            userConfigs: action.payload
           }),
           setOrder: (state, action: PayloadAction<IOrderConfig[]>) => ({
            ...state,
            userOrders: action.payload
           })
    }
})

export const {setUserConfig, setOrder} = profileSlice.actions

export default profileSlice.reducer