import { FC, useEffect, useRef, useState } from 'react';

import { RootState } from '../../redux/store/store';
import { useLocation } from 'react-router';
import { useAppSelector } from '../../redux/hook';

export type packNames = 'cart' | 'compare' | 'favourite';

export type addedBtnNames =
  | 'addedToCartBtn'
  | 'addedToCompareBtn'
  | 'addedToFavouriteBtn'
  | 'addedToBtnFromItem';

export type btnNames = 'cartBtn' | 'compareBtn' | 'favouriteBtn' | 'btnInItems';

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
  const pack = useAppSelector(
    (state: RootState) => state.PackItemsSlice[packName]
  );

  const [added, setAdded] = useState(false);

  const { pathname } = useLocation();

  const currBtn = useRef<HTMLButtonElement>(null);

  const checkAdded = (added: boolean) => {
    if (!added) {
      changePackFn(packName, 'add');
      setAdded(true);
    } else {
      changePackFn(packName, 'remove');
      setAdded(false);

      if (pathname === '/compare' && packName === 'compare') {
        currBtn.current?.closest('.items-info')?.remove();
      }
    }
  };

  useEffect(() => {
    if (pack.includes(itemId)) {
      setAdded(true);
    }
  }, [pack, itemId]);

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
