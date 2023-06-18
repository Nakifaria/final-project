import { useEffect, useState } from "react";
import ModalConfigurator from "../ModalConfigurator/ModalConfigurator";
import { Button } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store/store";
import { categoryFetch } from "../../../redux/thunk/category.action";
import { useNavigate } from "react-router-dom";
import {
  allCategoriesFetch,
  removeItemHandlerFetch,
} from "../../../redux/thunk/configurator.action";
import {
  setCategoryId,
  setCategoryTitle,
  setOpenModal,
  setSignificance,
} from "../../../redux/slices/configuratorSlice";

function Configurator() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const categoriesArr = useAppSelector(
    (state: RootState) => state.configuratorSlice.categoriesArr
  );

  const choosenCategory = useAppSelector(
    (state: RootState) => state.configuratorSlice.choosenCategory
  );

  const primaryParts = useAppSelector(
    (state: RootState) => state.configuratorSlice.primaryParts
  );
  const primaryPartsTotalAmount = useAppSelector(
    (state: RootState) => state.configuratorSlice.primaryPartsTotalAmount
  );
  const progressbarStyle = useAppSelector(
    (state: RootState) => state.configuratorSlice.progressbarStyle
  );
  const openModal = useAppSelector(
    (state: RootState) => state.configuratorSlice.openModal
  );
  const categoryId = useAppSelector(
    (state: RootState) => state.configuratorSlice.categoryId
  );
  const significance = useAppSelector(
    (state: RootState) => state.configuratorSlice.significance
  );
  const categoryTitle = useAppSelector(
    (state: RootState) => state.configuratorSlice.categoryTitle
  );
  const choosenItem = useAppSelector(
    (state: RootState) => state.configuratorSlice.choosenItem
  );

  const categoryItems = useAppSelector(
    (state: RootState) => state.catalog.category
  );

  useEffect(() => {
    dispatch(allCategoriesFetch());
  }, []);

  function openModalHandler(
    id: number,
    significance: number,
    categoryTitle: string
  ) {
    dispatch(setOpenModal(true));
    dispatch(setCategoryId(id));
    dispatch(setSignificance(significance));
    dispatch(setCategoryTitle(categoryTitle));
  }

  const [isLoading, setIsLoading] = useState(false);

  function removeItemHandler(id, significance) {
    dispatch(
      removeItemHandlerFetch(
        id,
        significance,
        choosenCategory,
        primaryParts,
        primaryPartsTotalAmount
      )
    );
  }

  useEffect(() => {
    dispatch(categoryFetch(categoryId, setIsLoading));
  }, [categoryId]);

  return (
    <>
      <div className="bg-gray-100 sm:grid grid-cols-5 grid-rows-2 px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
        <div className="h-max col-span-4 bg-gradient-to-tr from-gray-400 to-gray-200 rounded-md flex">
          <ul className="w-full">
            {categoriesArr &&
              categoriesArr.map((category) => (
                <li key={category.id}>
                  <div className="bg-white py-3 px-4 rounded-lg my-3 mx-3 flex justify-between items-center">
                    {category.significance ? (
                      <span className="w-1/12">{category.title}*</span>
                    ) : (
                      <span className="w-1/12">{category.title}</span>
                    )}

                    {choosenCategory.findIndex(
                      (el) => el.id === category.id && el.choosen === true
                    ) === -1 ? (
                      <span className="text-gray-500">
                        {category.amountItems} шт.
                      </span>
                    ) : (
                      <div className="flex justify-between gap-x-6 w-3/5">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8"
                            src="https://cdn1.ozone.ru/s3/multimedia-2/6368709194.jpg"
                            alt="Neil image"
                          />
                        </div>
                        <div className="flex justify-left gap-x-4">
                          <div className="min-w-0 flex-auto ">
                            <p
                              onClick={() =>
                                navigate(
                                  `/product/${
                                    choosenItem.find(
                                      (el) => el.categoryId === category.id
                                    )?.id
                                  }`
                                )
                              }
                              className="text-sm text-center font-bold leading-6 text-gray-900"
                            >
                              {
                                choosenItem.find(
                                  (el) => el.categoryId === category.id
                                )?.name
                              }
                            </p>
                          </div>
                        </div>
                        <div className="ml-10 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm text-center leading-6 text-gray-900">
                            {
                              choosenItem.find(
                                (el) => el.categoryId === category.id
                              )?.price
                            }{" "}
                            ₽
                          </p>
                        </div>
                      </div>
                    )}

                    {choosenCategory.findIndex(
                      (el) => el.id === category.id && el.choosen === true
                    ) === -1 ? (
                      <Button
                        onClick={() =>
                          openModalHandler(
                            category.id,
                            category.significance,
                            category.title
                          )
                        }
                        gradientDuoTone="purpleToBlue"
                      >
                        Добавить +
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          removeItemHandler(category.id, category.significance)
                        }
                        gradientDuoTone="pinkToOrange"
                      >
                        Удалить
                      </Button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="h-96 col-span-1 sticky top-20">
          <div className="bg-white py-3 px-4 rounded-lg">
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-blue-700">
                * - обязательные комплектующие
              </span>
              <span className="text-sm font-medium text-blue-700">
                {primaryParts}/{primaryPartsTotalAmount}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={progressbarStyle}
              ></div>
            </div>
          </div>

          <div className="bg-white  rounded-md">
            <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
              <input
                type="text"
                placeholder="Введите название сборки"
                className=" bg-gray-100 rounded-md  outline-none pl-2 ring-indigo-700 w-full mr-2 p-2"
              />
            </div>

            <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
              <input
                type="text"
                placeholder="Введите описание сборки (необязательно)"
                className=" bg-gray-100 rounded-md  outline-none pl-2 ring-indigo-700 w-full mr-2 p-2 h-64"
              />
            </div>
            <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Сохранить
              </button>
            </div>
            <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalConfigurator
        openModal={openModal}
        categoryId={categoryId}
        choosenCategory={choosenCategory}
        primaryParts={primaryParts}
        primaryPartsTotalAmount={primaryPartsTotalAmount}
        significance={significance}
        categoryTitle={categoryTitle}
        isLoading={isLoading}
        categoryItems={categoryItems}
        choosenItem={choosenItem}
      />
    </>
  );
}
export default Configurator;
