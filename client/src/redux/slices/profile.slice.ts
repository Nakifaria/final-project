import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IProfileConfig {
    title: string;
    createdAt: string
  }

export interface IProfileState {
    userConfigs: IProfileConfig [];
  }

const initialState: IProfileState = {
    userConfigs: [],
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
           setUserConfig: (state, action: PayloadAction<IProfileConfig[]>) => ({
            ...state,
            userConfigs: action.payload
           }),
           
    }
})

export const {setUserConfig} = profileSlice.actions

export default profileSlice.reducer