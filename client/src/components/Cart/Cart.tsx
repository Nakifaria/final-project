import "./Cart.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { SVGComponent } from "../Svg/SVGComponent";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { removeFromAction } from "../../redux/thunk/items.action";
import { Empty } from "../Empty/Empty";
import { deleteFromCart, initialCart } from "../../redux/slices/cart.slice";
import { useEffect, useState } from "react";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const cartItemsId = useAppSelector(
    (state: RootState) => state.PackItemsSlice.cart
  );

  const allCategoryItems = useAppSelector(
    (state: RootState) => state.itemsSlice.items
  );

  const filteredItems = allCategoryItems
    .map((el) => el.Items)
    .flat()
    .filter((el) => cartItemsId.includes(el.id));

  const allCart = useAppSelector((state: RootState) => state.cartSlice.items);

  // useEffect(() => {
  //   dispatch(
  //     initialCart({
  //       items: filteredItems.map((el) => {
  //         return { id: el.id, price: el.price };
  //       }),
  //     })
  //   );
  // }, []);

  const [totalPrice, setTotalPrice] = useState(0);

  const title = (id) => {
    const resultTitle = allCategoryItems.filter((item) => item.id === id);
    return resultTitle[0].title;
  };

  useEffect(() => {
    setTotalPrice(allCart.reduce((acc, val) => acc + val.price, 0));
  }, [allCart]);

  const updateTotalPrice = (
    itemPrice: number,
    action: "increment" | "decrement"
  ) => {
    if (action === "increment") {
      setTotalPrice((prevState) => prevState + itemPrice);
    } else if (action === "decrement") {
      setTotalPrice((prevState) => prevState - itemPrice);
    }
  };

  return (
    <div className=" pt-10 pb-40 bg-white shadow-xl shadow-neutral-300 px-4">
      {filteredItems.length === 0 && <Empty title="корзине" />}
      {filteredItems.length > 0 && (
        <div className=" h-full">
          <div>
            <h1 className="text-2xl mb-4 border-b border-gray-400 pb-10">
              Корзина
            </h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                {filteredItems &&
                  filteredItems.map((el) => (
                    <CartItem
                      item={el}
                      key={el.id}
                      itemCategoryTitle={title}
                      updateTotalPrice={updateTotalPrice}
                    />
                  ))}
              </div>
              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Итого к оплате:</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">{totalPrice} ₽</p>
                    <p className="text-sm text-gray-700">Включая НДС</p>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-md bg-red-800 py-1.5 font-medium text-blue-50 hover:bg-red-600 active:bg-gray-800">
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
