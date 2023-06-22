import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUserInfo {
  id: number;
  name: string;
  email: string;
  isAuth: boolean;
  cartId: number;
  regDate: string
}

const initialState: IUserInfo = {
  id: NaN,
  name: '',
  email: '',
  isAuth: false,
  cartId: NaN,
  regDate: ''
};

// export const userReg = createAsyncThunk(
//   'user/regFetchStatus',
//   async (formData) => {
//     const response = await fetch('http://localhost:3000/user/registration', {
//       method: 'POST',
//       headers: { 'Content-type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify(formData),
//     });

//     return response.json();
//   }
// );

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAuth: (state, action: PayloadAction<IUserInfo>) => {
      console.log(action.payload);
      
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuth = action.payload.isAuth;
      state.cartId = action.payload.cartId;
      state.regDate = action.payload.regDate
    },
    userDelete: (state) => {
      state.email = '';
      state.id = NaN;
      state.name = '';
      state.isAuth = false;
      state.cartId = NaN;
      state.regDate = ""
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(userReg.pending, (state, action) => {
  //     state.loading = 'pending';
  //   });
  //   builder.addCase(userReg.fulfilled, (state, action) => {
  //     state.loading = 'succeeded';
  //   });
  //   builder.addCase(userReg.rejected, (state, action) => {
  //     state.loading = 'failed';
  //   });
  // },
});

export const { userAuth, userDelete } = userSlice.actions;

export default userSlice.reducer;
