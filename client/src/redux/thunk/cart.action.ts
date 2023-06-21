import { ThunkActionCreater } from '../Types/thunk.type';
import { IPack } from '../../components/Home/itemCard';
import { addTo, deleteFrom } from '../slices/addItemsTo.slice';
import {
  ICartPrice,
  IItemsPrice,
  addToCart,
  deleteFromCart,
  deleteFromCartById,
  initialCart,
} from '../slices/cart.slice';

interface ICartPayload {
  item: IItemsPrice;
  isAuth: boolean;
}

export const addToCartAction: ThunkActionCreater<ICartPayload> =
  ({ item, isAuth }) =>
  (dispatch) => {
    const fullCart = localStorage.getItem('fullCart');
    //!добавить логику для авторизированного
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
    }
    dispatch(addToCart(item));
  };

export const removeFromCartAction: ThunkActionCreater<ICartPayload> =
  ({ item, isAuth }) =>
  (dispatch) => {
    const fullCart = localStorage.getItem('fullCart');
    //!добавить логику для авторизированного
    if (!isAuth) {
      if (fullCart) {
        const updatedCart: ICartPrice = JSON.parse(fullCart);

        const spliceIndex = updatedCart.items.indexOf(item);

        updatedCart.items.splice(spliceIndex, 1);

        localStorage.setItem('fullCart', JSON.stringify(updatedCart));
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
