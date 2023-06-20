import { toast } from 'react-toastify';
import { ThunkActionCreater } from '../Types/thunk.type';

import { IUserInfo, userAuth, userDelete } from '../slices/user.slice';
import { packNames } from '../../components/Home/ItemButton';
import { initial } from '../slices/addItemsTo.slice';
import { IPack } from '../../components/Home/itemCard';
import { AppDispatch, RootState } from '../store/store';
import { initialPacksAction } from './items.action';
import { endLoad, startLoad } from '../slices/loader.slice';
import { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

export const regUserThunk: ThunkActionCreater<Partial<IUserInfo>> =
  (formData) => (dispatch) => {
    const loading = toast.loading('Ждем ответ от сервера...');

    fetch('http://localhost:3000/user/registration', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData),
    })
      .then((data) => data.json())
      .then(({ auth, userInfo, msg }) => {
        if (auth) {
          dispatch(
            userAuth({
              email: userInfo.email,
              id: userInfo.id,
              name: userInfo.name,
              isAuth: true,
              cartId: userInfo.cartId,
            })
          );
          toast.update(loading, {
            render: 'Успех!',
            type: 'success',
            isLoading: false,
            autoClose: 2000,
          });
        } else {
          toast.update(loading, {
            render: msg,
            type: 'error',
            isLoading: false,
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        toast.update(loading, {
          render: error.toString(),
          type: 'error',
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

export const logUserThunk: ThunkActionCreater<Partial<IUserInfo>> =
  (formData) => (dispatch) => {
    const loading = toast.loading('Ждем ответ от сервера...');
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData),
    })
      .then((data) => data.json())
      .then(({ auth, userInfo, msg }) => {
        if (auth) {
          dispatch(
            userAuth({
              email: userInfo.email,
              id: userInfo.id,
              name: userInfo.name,
              isAuth: true,
              cartId: userInfo.cartId,
            })
          );
          toast.update(loading, {
            render: 'Успех!',
            type: 'success',
            isLoading: false,
            autoClose: 2000,
          });
        } else {
          toast.update(loading, {
            render: msg,
            type: 'error',
            isLoading: false,
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        toast.update(loading, {
          render: error.toString(),
          type: 'error',
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

export const logoutUserThunk: ThunkActionCreater = () => (dispatch) => {
  fetch('http://localhost:3000/user/logout', {
    credentials: 'include',
  })
    .then(() => dispatch(userDelete()))
    .catch(console.log);
};

const initialPackFromLocaleStorage = (
  packName: packNames,
  dispatch: AppDispatch
) => {
  const pack = localStorage.getItem(packName);

  if (pack) {
    const parsed: IPack = JSON.parse(pack);

    dispatch(initial({ items: parsed.items, packName }));
  }
};

type ThunkResult<R> = ThunkAction<R, RootState, undefined, AnyAction>;

export const checkSessionThunk: ThunkResult<void> =
  (): ThunkResult<void> =>
  (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    fetch('http://localhost:3000/user', {
      credentials: 'include',
    })
      .then((data) => data.json())
      .then(({ session, user }) => {
        if (session) {
          dispatch(userAuth({ ...user, isAuth: true }));
          dispatch(
            initialPacksAction({ packName: 'favourite', userId: user.id })
          );
          dispatch(
            initialPacksAction({ packName: 'compare', userId: user.id })
          );
          dispatch(initialPacksAction({ packName: 'cart', userId: user.id }));
        } else {
          initialPackFromLocaleStorage('favourite', dispatch);
          initialPackFromLocaleStorage('compare', dispatch);
          initialPackFromLocaleStorage('cart', dispatch);
        }
      })
      .catch(console.log);
  };
