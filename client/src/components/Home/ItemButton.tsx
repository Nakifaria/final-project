import { Dispatch, FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useLocation } from 'react-router';

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

  const { pathname } = useLocation();

  const currBtn = useRef<HTMLButtonElement>(null);

  const checkAdded = (added: boolean) => {
    console.log(pack.length);

    if (!added) {
      changePackFn(packName, 'add');
      setAdded(true);
    } else {
      changePackFn(packName, 'remove');
      setAdded(false);

      if (pathname === '/compare' && packName === 'compare') {
        currBtn.current?.closest('.item-card')?.remove();
      }
    }
  };

  useEffect(() => {
    if (pack.includes(itemId)) {
      setAdded(true);
    }
  }, []);

  return (
    <button
      ref={currBtn}
      onClick={() => checkAdded(added)}
      className={`${added ? addedBtnName : btnName}`}
    >
      {children}
    </button>
  );
};
