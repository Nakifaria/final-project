import { toast } from 'react-toastify';
import { ThunkActionCreater } from '../Types/thunk.type';
import { endLoad, startLoad } from '../slices/loader.slice';
import { ICategory, setItems } from '../slices/items.slice';

import { addTo, deleteFrom, initial } from '../slices/addItemsTo.slice';
import { packNames } from '../../components/Home/ItemButton';
import {
  addToLocalStorage,
  removeFromLocalStorage,
} from './lib/localStorageFn';

interface IPackPayload {
  id: number;
  isAuth: boolean;
  packName: packNames;
  userId: number;
  cartId: number;
}

interface IPackInitPayload {
  packName: packNames;
  userId: number;
}

interface UserItemsResponse {
  settedItems: boolean;
  userItems?: number[];
  msg: string;
}

export const loadItems: ThunkActionCreater = () => (dispatch) => {
  dispatch(startLoad());
  fetch('http://localhost:3000/items', { credentials: 'include' })
    .then((data) => data.json())
    .then(({ items, msg }) => {
      if (items.length !== 0) {
        dispatch(setItems(items));
        dispatch(endLoad());

        // искусственная задержка
        // setTimeout(() => {
        //   dispatch(endLoad());
        // }, 3000);
      } else {
        toast.error(msg, { autoClose: 2000 });
        dispatch(endLoad());
      }
    })
    .catch((error) => {
      toast.error('Непредусмотренная ошибка', { autoClose: 2000 });
      console.log(error);
      dispatch(endLoad());
    });
};

export const initialPacksAction: ThunkActionCreater<IPackInitPayload> =
  ({ userId, packName }) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:3000/${packName}/${userId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      const { settedItems, msg, userItems }: UserItemsResponse =
        await response.json();

      if (!settedItems) {
        toast.error(msg, {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          draggable: false,
        });
      } else if (settedItems && userItems) {
        dispatch(initial({ packName, items: userItems }));
      }
    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: false,
      });
    }
  };

export const addToAction: ThunkActionCreater<IPackPayload> =
  ({ id, isAuth, packName, userId, cartId }) =>
  async (dispatch) => {
    if (!isAuth) {
      addToLocalStorage(id, packName);
      dispatch(addTo({ itemId: id, packName }));
    } else {
      try {
        const response = await fetch(`http://localhost:3000/${packName}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body:
            packName === 'cart'
              ? JSON.stringify({ itemId: id, userId, cartId })
              : JSON.stringify({ itemId: id, userId }),
        });

        const { settedItems, msg }: UserItemsResponse = await response.json();

        if (!settedItems) {
          toast.error(msg, {
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: false,
          });
        } else {
          dispatch(addTo({ itemId: id, packName }));
        }
      } catch (error) {
        toast.error(`${error}`, {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          draggable: false,
        });
      }
    }
  };

export const removeFromAction: ThunkActionCreater<IPackPayload> =
  ({ id, isAuth, packName, userId, cartId }) =>
  async (dispatch) => {
    if (!isAuth) {
      removeFromLocalStorage(id, packName);
      dispatch(deleteFrom({ itemId: id, packName }));
    } else {
      try {
        const response = await fetch(`http://localhost:3000/${packName}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body:
            packName === 'cart'
              ? JSON.stringify({ itemId: id, userId, cartId })
              : JSON.stringify({ itemId: id, userId }),
        });

        const { settedItems, msg }: UserItemsResponse = await response.json();

        if (!settedItems) {
          toast.error(msg, {
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: false,
          });
        } else {
          dispatch(deleteFrom({ itemId: id, packName }));
        }
      } catch (error) {
        toast.error(`${error}`, {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          draggable: false,
        });
      }
    }
  };
