import { ThunkActionCreater } from '../Types/thunk.type';
import {
  ICartPrice,
  IItemsPrice,
  addToCart,
  deleteFromCart,
  deleteFromCartById,
  initialCart,
} from '../slices/cart.slice';
import { toast } from 'react-toastify';

interface ICartPayload {
  item: IItemsPrice;
  isAuth: boolean;
  cartId?: number;
}

interface UpdateItemsCount {
  settedItems: boolean;
  msg: string;
}

export const addToCartAction: ThunkActionCreater<ICartPayload> =
  ({ item, isAuth, cartId }) =>
  async (dispatch) => {
    const fullCart = localStorage.getItem('fullCart');

    if (!isAuth) {
      if (!fullCart) {
        localStorage.setItem(
          'fullCart',
          JSON.stringify({
            items: [item],
          })
        );
      } else {
        const updatedCart: ICartPrice = JSON.parse(fullCart);

        updatedCart.items.push(item);

        localStorage.setItem('fullCart', JSON.stringify(updatedCart));
      }
    } else {
      if (cartId) {
        try {
          const response = await fetch('http://localhost:3000/cart/increment', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId: item.id, cartId }),
          });

          const { settedItems, msg }: UpdateItemsCount = await response.json();

          if (!settedItems) {
            toast.error(msg, {
              autoClose: 2000,
              pauseOnHover: true,
              closeOnClick: true,
              draggable: false,
            });
          }
        } catch (error) {
          toast.error(error?.toString(), {
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: false,
          });
        }
      }
    }

    dispatch(addToCart(item));
  };

export const removeFromCartAction: ThunkActionCreater<ICartPayload> =
  ({ item, isAuth, cartId }) =>
  async (dispatch) => {
    const fullCart = localStorage.getItem('fullCart');

    if (!isAuth) {
      if (fullCart) {
        const updatedCart: ICartPrice = JSON.parse(fullCart);

        const spliceIndex = updatedCart.items.indexOf(item);

        updatedCart.items.splice(spliceIndex, 1);

        localStorage.setItem('fullCart', JSON.stringify(updatedCart));
      }
    } else {
      if (cartId) {
        try {
          const response = await fetch('http://localhost:3000/cart/decrement', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId: item.id, cartId }),
          });

          const { settedItems, msg }: UpdateItemsCount = await response.json();

          if (!settedItems) {
            toast.error(msg, {
              autoClose: 2000,
              pauseOnHover: true,
              closeOnClick: true,
              draggable: false,
            });
          }
        } catch (error) {
          toast.error(error?.toString(), {
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: false,
          });
        }
      }
    }

    dispatch(deleteFromCart(item));
  };

export const removeAllByIdFromCartAction: ThunkActionCreater<ICartPayload> =
  ({ item, isAuth }) =>
  (dispatch) => {
    const fullCart = localStorage.getItem('fullCart');

    //!добавить логику для авторизированного
    if (!isAuth) {
      if (fullCart) {
        const cartToFilter: ICartPrice = JSON.parse(fullCart);

        console.log(cartToFilter);

        const updatedCart = {
          items: cartToFilter.items.filter((el) => el.id !== item.id),
        };

        localStorage.setItem('fullCart', JSON.stringify(updatedCart));
      }
    }
    dispatch(deleteFromCartById(item));
  };

interface IFullCart {
  isAuth: boolean;
}

export const initFullCartAction: ThunkActionCreater<IFullCart> =
  ({ isAuth }) =>
  (dispatch) => {
    //!добавить логику для авторизированного
    if (!isAuth) {
      const fullCart = localStorage.getItem('fullCart');

      if (fullCart) {
        const сart: ICartPrice = JSON.parse(fullCart);

        dispatch(initialCart(сart));
      }
    }
  };
