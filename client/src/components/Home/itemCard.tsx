import { Dispatch, FC, useRef } from 'react';
import { IItem } from '../../redux/slices/items.slice';
import { SVGComponent } from '../Svg/SVGComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { addToAction, removeFromAction } from '../../redux/thunk/items.action';
import { ItemButton, packNames } from './ItemButton';
import { useNavigate } from 'react-router';

export interface ICardItem {
  item: IItem;
}

export interface IPack {
  items: number[];
}

export const ItemCard: FC<ICardItem> = ({ item }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isAuth = useSelector((state: RootState) => state.userSlice.isAuth);

  const changePackFn = (packName: packNames, action: 'remove' | 'add') => {
    if (action === 'add') {
      dispatch(addToAction({ id: item.id, isAuth, packName }));
    } else if (action === 'remove') {
      dispatch(removeFromAction({ id: item.id, isAuth, packName }));
    }
  };

  return (
    <div className="item-card w-[200px] h-[400px] flex flex-col justify-between">
      <header
        onClick={() => navigate(`/product/${item.id}`)}
        className="cursor-pointer grow flex flex-col justify-center overflow-hidden"
      >
        <img src={item.img} alt={item.name} className="max-w-full" />
      </header>
      <main>
        <div className="flex flex-col gap-2">
          <span
            onClick={() => navigate(`/product/${item.id}`)}
            className="text-xs text-center cursor-pointer hover:text-red-500 h-8 "
          >
            {item.name}
          </span>
          <span className="text-lg text-center ">{item.price} ₽</span>
          <div className="flex flex-col">
            <div className="flex border border-black rounded-t-lg overflow-hidden">
              <ItemButton
                packName="compare"
                changePackFn={changePackFn}
                addedBtnName="addedToCompareBtn"
                btnName="compareBtn"
                itemId={item.id}
              >
                <SVGComponent svgName="compare" />
              </ItemButton>
              <ItemButton
                packName="favourite"
                changePackFn={changePackFn}
                addedBtnName="addedToFavouriteBtn"
                btnName="favouriteBtn"
                itemId={item.id}
              >
                <SVGComponent svgName="favourite" />
              </ItemButton>
            </div>
            <div className="flex border border-black border-t-0 rounded-b-lg overflow-hidden">
              <ItemButton
                packName="cart"
                changePackFn={changePackFn}
                addedBtnName="addedToCartBtn"
                btnName="cartBtn"
                itemId={item.id}
              >
                <SVGComponent svgName="cart" />
              </ItemButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
