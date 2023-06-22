import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setCurrentConfiguration } from "../../../redux/slices/configuratorSlice";
import { RootState } from "../../../redux/store/store";
import { toast } from "react-toastify";

export const ConfigurationPage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userStatus = useAppSelector((state: RootState) => state.userSlice);
  const { configurationId } = useParams();
  console.log("configurationId", configurationId);
  const configurationData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/configurator/${configurationId}`,
        { credentials: "include" }
      );
      const itemData = await response.json();
      console.log("itemData");
      dispatch(setCurrentConfiguration(itemData));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  };

  const currentConfiguration = useAppSelector(
    (state: RootState) => state.configuratorSlice.currentConfiguration
  );

  useEffect(() => {
    configurationData();
  }, []);

  function totalPrice() {
    return currentConfiguration.items.reduce((acc, el) => acc + el.price, 0);
  }

  async function buyBtnHandler() {
    {
      const itemIdArr = currentConfiguration.items.map((el) => el.id);
      itemIdArr.forEach(async (el) => {
        const response = await fetch("http://localhost:3000/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ cartId: userStatus.cartId, itemId: el }),
        });
        if (!response.ok) {
          toast.error("Не удалось сохранить сборку", {
            autoClose: 2000,
          });
          return;
        }
      });
    }
    navigate("/cart");
  }

  if (isLoading) {
    return (
      <div className="mt-10 flex items-center justify-center min-h-screen bg-white shadow-xl shadow-neutral-300">
        <div className="hidden bg-cover lg:block lg:w-2/5">
          {currentConfiguration && (
            <img
              src={
                currentConfiguration.items.find((el) => el.category_id === 7)
                  .img
              }
            />
          )}
        </div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl mb-10 font-semibold tracking-wider text-gray-800 capitalize ">
              {currentConfiguration.title}
            </h1>

            {currentConfiguration && currentConfiguration.description && (
              <div className="mt-8 text-gray-500 mb-6 ">
                <span>{currentConfiguration.description}</span>
              </div>
            )}
            {currentConfiguration && currentConfiguration && (
              <div className="mt-4 flex flex-col gap-y-6">
                {currentConfiguration.items.map((el) => (
                  <div
                    key={el.id}
                    className="flex justify-between gap-x-6 w-full"
                  >
                    <div className="flex justify-between gap-x-6 w-full">
                      <div className="flex-shrink-0">
                        <img
                          className="w-16 h-16"
                          src={el.img}
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex justify-left gap-x-4">
                        <div className="min-w-0 flex-auto flex items-center">
                          <p
                            onClick={() => navigate(`/product/${el.id}`)}
                            className="text-sm text-center font-bold leading-6 text-gray-900"
                          >
                            {el.name}
                          </p>
                        </div>
                      </div>
                      <div className="ml-10  w-1/4 flex items-center justify-center">
                        <p className="text-sm text-center  text-gray-900 ">
                          {el.price}₽
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6">
              <h1 className="text-gray-800 text-xl text-center mt-10 mb-4">
                Цена сборки: {totalPrice()} ₽
              </h1>
              <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
                <button
                  onClick={() => buyBtnHandler()}
                  type="button"
                  className="w-full text-white bg-gradient-to-r bg-red-800 hover:bg-red-500 active:hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Все детали в корзину
                </button>
              </div>
              <div className="mt-3 md:flex md:items-center md:-mx-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
