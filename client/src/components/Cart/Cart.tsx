import './Cart.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { SVGComponent } from '../Svg/SVGComponent';

import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { removeFromAction } from '../../redux/thunk/items.action';
import { Empty } from '../Empty/Empty';

export const Cart = () => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(
    (state: RootState) => state.PackItemsSlice.cart
  );
  const allCategoryItems = useAppSelector(
    (state: RootState) => state.itemsSlice.items
  );
  const isAuth = useAppSelector((state: RootState) => state.userSlice.isAuth);

  const allItems = [];
  allCategoryItems.map((el) => allItems.push(...el.Items));
  console.log(allItems);

  const filteredItems = [];
  cartItems.map((item) => {
    const result = allItems.filter((el) => el.id === item);
    filteredItems.push(...result);
  });
  console.log(filteredItems);

  const totalPrice = () => {
    const sum = filteredItems.reduce((acc, val) => acc + val.price, 0);
    return sum;
  };

  const title = (id) => {
    const resultTitle = allCategoryItems.filter((item) => item.id === id);
    return resultTitle[0].title;
  };

  const deleteItem = (id) => {
    // dispatch(deleteFromCart(id));
    dispatch(removeFromAction({ id, isAuth, packName: 'cart' }));
  };

  return (
    <>
      {filteredItems.length === 0 && <Empty title="корзине" />}
      {filteredItems.length > 0 && (
        <div>
          <div className="bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Корзина</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                {filteredItems &&
                  filteredItems.map((el) => (
                    <div
                      key={el.id}
                      className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    >
                      <img
                        src={el.img}
                        alt="product-image"
                        className="w-full rounded-lg sm:w-40"
                      />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900">
                            {el.name}
                          </h2>
                          <p className="mt-1 text-xs text-gray-700">
                            {title(el.category_id)}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="flex items-center border-gray-100">
                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                              {' '}
                              -{' '}
                            </span>
                            <input
                              className="h-8 w-8 border bg-white text-center text-xs outline-none"
                              type="number"
                              defaultValue={1}
                              min="1"
                            />
                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                              {' '}
                              +{' '}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <p className="text-sm">{el.price} ₽</p>
                            {/* <button> */}
                            <button onClick={() => deleteItem(el.id)}>
                              <SVGComponent svgName="delete" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                {/* <div className="mb-2 flex justify-between">
		 <p className="text-gray-700">Subtotal</p>
		 <p className="text-gray-700">$129.99</p>
	 </div>
	 <div className="flex justify-between">
		 <p className="text-gray-700">Shipping</p>
		 <p className="text-gray-700">$4.99</p>
	 </div> */}
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Итого к оплате:</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">{totalPrice()} ₽</p>
                    <p className="text-sm text-gray-700">Включая НДС</p>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
