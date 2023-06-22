import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { IItem } from '../../redux/slices/items.slice';
import { RootState } from '../../redux/store/store';
import { removeFromAction } from '../../redux/thunk/items.action';
import { SVGComponent } from '../Svg/SVGComponent';
import { addToCart, deleteFromCart } from '../../redux/slices/cart.slice';
import {
  addToCartAction,
  removeAllByIdFromCartAction,
  removeFromCartAction,
} from '../../redux/thunk/cart.action';

interface ICartProps {
  item: IItem;
  itemCategoryTitle: (catId: number) => string;
  updateTotalPrice: (
    itemPrice: number,
    action: 'increment' | 'decrement'
  ) => void;
}

export const CartItem: FC<ICartProps> = ({
  item,
  itemCategoryTitle,
  updateTotalPrice,
}) => {
  const dispatch = useAppDispatch();

  const title = itemCategoryTitle(item.category_id);

  const cartItems = useAppSelector((state: RootState) => state.cartSlice.items);

  const isAuth = useAppSelector((state: RootState) => state.userSlice.isAuth);

  const cartId = useAppSelector((state: RootState) => state.userSlice.cartId);
  const userId = useAppSelector((state: RootState) => state.userSlice.id);

  const [itemCount, setItemCount] = useState(
    cartItems.filter((el) => el.id === item.id).length
  );

  const [itemPrice, setItemPrice] = useState(item.price);

  console.log(itemCount);

  useEffect(() => {
    if (!isAuth) {
      setItemCount(cartItems.filter((el) => el.id === item.id).length);
    } else {
      setItemCount(
        cartItems.filter((el) => el.id === item.id).map((el) => el.count)[0]
      );
    }
  }, [cartItems]);

  useEffect(() => {
    setItemPrice(itemPrice * itemCount);
  }, []);

  const deleteItem = (id, price) => {
    dispatch(
      removeFromAction({ id, isAuth, packName: 'cart', cartId, userId })
    );

    if (!isAuth) {
      dispatch(
        removeAllByIdFromCartAction({
          item: { id, price },
          isAuth,
        })
      );
    }
  };

  const updateCount = (
    action: 'increment' | 'decrement',
    itemId: number,
    itemCount: number,
    itemPrice: number
  ) => {
    if (action === 'increment' && itemCount >= 1) {
      dispatch(
        addToCartAction({
          item: { id: itemId, price: itemPrice },
          isAuth,
          cartId,
        })
      );
      updateTotalPrice(itemPrice, action);
      setItemPrice((prevState) => prevState + itemPrice);
    } else if (action === 'decrement' && itemCount > 1) {
      dispatch(
        removeFromCartAction({
          item: { id: itemId, price: itemPrice },
          isAuth,
          cartId,
        })
      );
      updateTotalPrice(itemPrice, action);
      setItemPrice((prevState) => prevState - itemPrice);
    }
  };

  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={item.img}
        alt="product-image"
        className="w-full rounded-lg sm:w-40"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
          <p className="mt-1 text-xs text-gray-700">{title}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <button
              onClick={() =>
                updateCount('decrement', item.id, itemCount, item.price)
              }
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              -
            </button>
            <span className="h-8 w-8 inline-flex items-center justify-center border bg-white text-xs outline-none">
              {itemCount}
            </span>
            <button
              onClick={() =>
                updateCount('increment', item.id, itemCount, item.price)
              }
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              +
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">{itemPrice} ₽</p>
            <button onClick={() => deleteItem(item.id, item.price)}>
              <SVGComponent svgName="delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
