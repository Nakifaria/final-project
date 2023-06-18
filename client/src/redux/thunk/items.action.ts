import { toast } from 'react-toastify';
import { ThunkActionCreater } from '../Types/thunk.type';
import { startLoad } from '../slices/loader.slice';
import { setItems } from '../slices/items.slice';

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
