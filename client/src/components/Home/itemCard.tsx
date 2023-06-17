import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { IItem } from '../../redux/slices/items.slice';
import { SVGComponent } from '../Svg/SVGComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { addToCart, initialCart } from '../../redux/slices/cart.slise';

export interface ICardItem {
  item: IItem;
}

export interface ICart {
  items: number[];
}

export const ItemCard: FC<ICardItem> = ({ item }) => {
  const dispatch = useDispatch();

  const cartFromRedux = useSelector(
    (state: RootState) => state.cartSlise.items
  );

  const isAuth = useSelector((state: RootState) => state.userSlice.isAuth);

  const [addedToCart, setAddedToCart] = useState(false);

  const addToCartFn = () => {
    if (!isAuth) {
      const cart = localStorage.getItem('cart');

      if (!cart) {
        localStorage.setItem(
          'cart',
          JSON.stringify({
            items: [item.id],
          })
        );

        dispatch(addToCart(item.id));
        setAddedToCart(true);
      } else {
        const updatedCart: ICart = JSON.parse(cart);

        updatedCart.items.push(item.id);

        localStorage.setItem('cart', JSON.stringify(updatedCart));

        dispatch(initialCart(updatedCart.items));
        setAddedToCart(true);
      }
    }

    return;
  };

  const removeFromCartFn = () => {
    if (!isAuth) {
      
    }

    return;
  };

  useEffect(() => {
    const cart = localStorage.getItem('cart');

    if (cart) {
      const parsedCart: ICart = JSON.parse(cart);

      if (parsedCart.items.includes(item.id)) {
        setAddedToCart(true);
      }
    }
  }, []);

  return (
    <div className="w-[200px] h-[400px] flex flex-col justify-between">
      <header className="cursor-pointer h-1/2 flex flex-col justify-center">
        <img src={item.img} alt={item.name} />
      </header>
      <main>
        <div className="flex flex-col gap-2">
          <span className="text-xs text-center cursor-pointer hover:text-red-500 h-8 ">
            {item.name}
          </span>
          <span className="text-lg text-center ">{item.price} ₽</span>
          <div className="flex flex-col">
            <div className="flex border border-black rounded-t-lg">
              <button className="w-1/2 px-2 py-2 border-r border-black flex justify-center hover:text-white hover:bg-black ">
                <SVGComponent svgName="sravnenie" />
              </button>
              <button className="w-1/2 px-2 py-2 flex justify-center hover:text-white hover:bg-black ">
                <SVGComponent svgName="favourite" />
              </button>
            </div>
            <div className="flex border border-black border-t-0 rounded-b-lg">
              <button
                id={`${item.id}`}
                onClick={addToCartFn}
                className={`${addedToCart ? 'addedToCartBtn' : 'cartBtn'}`}
              >
                <SVGComponent svgName="cart" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
