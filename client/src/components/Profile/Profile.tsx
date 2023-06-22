import { useEffect, useState } from "react";
import { SVGComponent } from "../Svg/SVGComponent";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store/store";
import { setOrder, setUserConfig } from "../../redux/slices/profile.slice";
import { Empty } from "../Empty/Empty";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userInfo = useAppSelector((state: RootState) => state.userSlice);

  console.log(userInfo);

  const date = new Date(userInfo.regDate).toLocaleDateString("ru-RU");

  const configFetch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/profile/configuration/${userInfo.id}`
      );
      const configData = await response.json();
      // console.log(configData);
      dispatch(setUserConfig(configData));
    } catch (error) {
      console.log(error);
    }
  };

  const orderFetch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/profile/orders/${userInfo.id}`
      );
      const cartData = await response.json();
      console.log(cartData);
      if (cartData.ordered) {
        dispatch(setOrder(cartData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    configFetch(), orderFetch();
  }, [userInfo]);

  const configInfo = useAppSelector(
    (state: RootState) => state.profileSlice.userConfigs
  );

  const orderInfo = useAppSelector(
    (state: RootState) => state.profileSlice.userOrders
  );

  // console.log(orderInfo);

  return (
    <>
      <div className="bg-gray-100 border-b">
        <a className="block px-4 py-2 mt-2 text-sm text-gray-900" href="#">
          Logout
        </a>
      </div>

      <div className="container mx-auto my-5 p-5">
        {/* <h1 className="mb-10 text-center text-2xl font-bold">Профиль Кота</h1> */}
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-red-700">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto"
                  src="http://localhost:3000/images/bassBoostedBoyarin.jpg"
                  alt=""
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {userInfo.name}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                {userInfo.email}
              </h3>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Дата регистрации</span>
                  <span className="ml-auto">{date}</span>
                </li>
              </ul>
            </div>
            <div className="my-4"></div>
          </div>

          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="grid">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span className="h-8 w-8">
                    <SVGComponent svgName="config" />
                  </span>
                  <span className="tracking-wide text-2xl text-gray-800">
                    Сохраненные конфигурации
                  </span>
                </div>

                {configInfo.length === 0 && <Empty title="конфигурациях" />}

                <ul className="list-inside space-y-2 mb-10">
                  {configInfo &&
                    configInfo.map((item) => (
                      <li
                        className="list-disc"
                        key={item.id}
                        onClick={() => navigate(`/configurator/${item.id}`)}
                      >
                        <span className="text-red-900 text-xl">
                          {item.title}
                        </span>
                        <div className="text-gray-500 text-sm">
                          {new Date(item.createdAt).toLocaleDateString("ru-RU")}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

              {orderInfo.length === 0 && <Empty title="заказах" />}
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div>
                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Номер заказа
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Сумма заказа
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Дата заказа
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Статус заказа
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {orderInfo &&
                            orderInfo.map((item) => (
                              <tr key={item.id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        100500-{item.id}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item.total_price}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {new Date(
                                      item.createdAt
                                    ).toLocaleDateString("ru-RU")}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative">Activo</span>
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
