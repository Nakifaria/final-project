import { ThunkActionCreater } from '../Types/thunk.type';
import { IPack } from '../../components/Home/itemCard';
import { addTo, deleteFrom } from '../slices/addItemsTo.slice';

interface ICartPayload {
  id: number;
  isAuth: boolean;
}

export const addToCartAction: ThunkActionCreater<ICartPayload> =
  ({ id, isAuth }) =>
  (dispatch) => {
    const cart = localStorage.getItem('cart');

    if (!isAuth) {
      if (!cart) {
        localStorage.setItem(
          'cart',
          JSON.stringify({
            items: [id],
          })
        );
      } else {
        console.log(typeof cart);

        const updatedCart: IPack = JSON.parse(cart);

        updatedCart.items.push(id);

        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      dispatch(addTo({ itemId: id, packName: 'cart' }));
    }
  };

export const removeFromCartAction: ThunkActionCreater<ICartPayload> =
  ({ id, isAuth }) =>
  (dispatch) => {
    const cart = localStorage.getItem('cart');

    if (!isAuth) {
      dispatch(deleteFrom({ itemId: id, packName: 'cart' }));

      if (cart) {
        const updatedCart: IPack = JSON.parse(cart);

        const spliceIndex = updatedCart.items.indexOf(id);

        updatedCart.items.splice(spliceIndex, 1);

        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    }
  };
