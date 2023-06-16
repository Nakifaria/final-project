import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type ThunkActionCreater<PayloadType = void, ReturnType = void> = (
  payload: PayloadType
) => AppThunk<ReturnType>;
