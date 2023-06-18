import { toast } from 'react-toastify';
import { ThunkActionCreater } from '../Types/thunk.type';
import { startLoad } from '../slices/loader.slice';
import { setItems } from '../slices/items.slice';
import { IPack } from '../../components/Home/itemCard';
import { addTo, deleteFrom } from '../slices/addItemsTo.slice';
import { packNames } from '../../components/Home/ItemButton';

interface IPackPayload {
  id: number;
  isAuth: boolean;
  packName: packNames;
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

const addToLocalStorage = (id: number, packName: string) => {
  const pack = localStorage.getItem(packName);

  if (!pack) {
    localStorage.setItem(
      packName,
      JSON.stringify({
        items: [id],
      })
    );
  } else {
    const updated: IPack = JSON.parse(pack);

    updated.items.push(id);

    localStorage.setItem(packName, JSON.stringify(updated));
  }
};

export const addToAction: ThunkActionCreater<IPackPayload> =
  ({ id, isAuth, packName }) =>
  (dispatch) => {
    if (!isAuth) {
      addToLocalStorage(id, packName);

      dispatch(addTo({ itemId: id, packName }));
    }
  };

const removeFromLocalStorage = (id: number, packName: string) => {
  const pack = localStorage.getItem(packName);

  const updated: IPack = pack && JSON.parse(pack);

  const spliceIndex = updated.items.indexOf(id);

  updated.items.splice(spliceIndex, 1);

  localStorage.setItem(packName, JSON.stringify(updated));
};

export const removeFromAction: ThunkActionCreater<IPackPayload> =
  ({ id, isAuth, packName }) =>
  (dispatch) => {
    if (!isAuth) {
      dispatch(deleteFrom({ itemId: id, packName }));

      removeFromLocalStorage(id, packName);
    }
  };
