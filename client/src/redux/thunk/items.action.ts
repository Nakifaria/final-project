import { toast } from 'react-toastify';
import { ThunkActionCreater } from '../Types/thunk.type';
import { startLoad } from '../slices/loader.slice';
import { setItems } from '../slices/items.slice';
import { IPack } from '../../components/Home/itemCard';
import { addTo, deleteFrom } from '../slices/addItemsTo.slice';

interface IPackPayload {
  id: number;
  isAuth: boolean;
  packName: 'cart' | 'compare' | 'favourite';
}

export const loadItems: ThunkActionCreater = () => (dispatch) => {
  dispatch(startLoad(true));
  fetch('http://localhost:3000/items', { credentials: 'include' })
    .then((data) => data.json())
    .then(({ items, msg }) => {
      if (items.length !== 0) {
        dispatch(setItems(items));
        dispatch(startLoad(false));

        // искусственная задержка
        // setTimeout(() => {
        //   dispatch(startLoad(false));
        // }, 3000);
      } else {
        toast.error(msg, { autoClose: 2000 });
        dispatch(startLoad(false));
      }
    })
    .catch((error) => {
      toast.error('Непредусмотренная ошибка', { autoClose: 2000 });
      console.log(error);
      dispatch(startLoad(false));
    });
};

export const addToAction: ThunkActionCreater<IPackPayload> =
  ({ id, isAuth, packName }) =>
  (dispatch) => {
    const cart = localStorage.getItem('cart');
    const compare = localStorage.getItem('compare');
    const favourite = localStorage.getItem('favourite');

    if (!isAuth) {
      switch (packName) {
        case 'cart':
          if (!cart) {
            localStorage.setItem(
              'cart',
              JSON.stringify({
                items: [id],
              })
            );
          } else {
            const updatedCart: IPack = JSON.parse(cart);

            updatedCart.items.push(id);

            localStorage.setItem('cart', JSON.stringify(updatedCart));
          }
      }

      dispatch(addTo({ itemId: id, packName }));
    }
  };

export const removeFromAction: ThunkActionCreater<IPackPayload> =
  ({ id, isAuth, packName }) =>
  (dispatch) => {
    const cart = localStorage.getItem('cart');
    const compare = localStorage.getItem('compare');
    const favourite = localStorage.getItem('favourite');

    if (!isAuth) {
      dispatch(deleteFrom({ itemId: id, packName }));

      if (cart && packName === 'cart') {
        const updatedCart: IPack = JSON.parse(cart);

        const spliceIndex = updatedCart.items.indexOf(id);

        updatedCart.items.splice(spliceIndex, 1);

        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }

      if (compare && packName === 'compare') {
        const updatedCompare: IPack = JSON.parse(compare);

        const spliceIndex = updatedCompare.items.indexOf(id);

        updatedCompare.items.splice(spliceIndex, 1);

        localStorage.setItem('compare', JSON.stringify(updatedCompare));
      }

      if (favourite && packName === 'favourite') {
        const updatedFavourite: IPack = JSON.parse(favourite);

        const spliceIndex = updatedFavourite.items.indexOf(id);

        updatedFavourite.items.splice(spliceIndex, 1);

        localStorage.setItem('compare', JSON.stringify(updatedFavourite));
      }
    }
  };
