import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { endLoad, startLoad } from '../../redux/slices/loader.slice';

export type packNames = 'cart' | 'compare' | 'favourite';

export type addedBtnNames =
  | 'addedToCartBtn'
  | 'addedToCompareBtn'
  | 'addedToFavouriteBtn';

export type btnNames = 'cartBtn' | 'compareBtn' | 'favouriteBtn';

export interface IItemBtn {
  children: JSX.Element;
  packName: packNames;
  changePackFn: (packName: packNames, action: 'add' | 'remove') => void;
  addedBtnName: addedBtnNames;
  btnName: btnNames;
  itemId: number;
}

export const ItemButton: FC<IItemBtn> = ({
  children,
  packName,
  changePackFn,
  addedBtnName,
  btnName,
  itemId,
}) => {
  const pack = useSelector(
    (state: RootState) => state.PackItemsSlice[packName]
  );

  const [added, setAdded] = useState(false);

  const checkAdded = (added: boolean) => {
    console.log(pack.length);

    if (!added) {
      changePackFn(packName, 'add');
      setAdded(true);
    } else {
      changePackFn(packName, 'remove');
      setAdded(false);
    }
  };

  useEffect(() => {
    if (pack.includes(itemId)) {
      setAdded(true);
    }
  }, []);

  return (
    <button
      onClick={() => checkAdded(added)}
      className={`${added ? addedBtnName : btnName}`}
    >
      {children}
    </button>
  );
};
