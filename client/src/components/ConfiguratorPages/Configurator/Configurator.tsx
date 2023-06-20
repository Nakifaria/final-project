import { useEffect, useState } from "react";
import ModalConfigurator from "../ModalConfigurator/ModalConfigurator";
import { Button } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store/store";
import { categoryFetch } from "../../../redux/thunk/category.action";
import { useNavigate } from "react-router-dom";
import {
  ChooseHandlerFetch,
  allCategoriesFetch,
  removeItemHandlerFetch,
} from "../../../redux/thunk/configurator.action";
import {
  setCategoryId,
  setCategoryTitle,
  setChoosenCategory,
  setChoosenItem,
  setDescription,
  setOpenModal,
  setPrimaryParts,
  setProgressbarStyle,
  setSignificance,
  setTitle,
} from "../../../redux/slices/configuratorSlice";
import { ChooseHandlerType } from "../../../types/configurator.types";
import { toast } from "react-toastify";

function Configurator() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const categoriesArr = useAppSelector(
    (state: RootState) => state.configuratorSlice.categoriesArr
  );

  const title = useAppSelector(
    (state: RootState) => state.configuratorSlice.title
  );

  const description = useAppSelector(
    (state: RootState) => state.configuratorSlice.description
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

  const [isLoading, setIsLoading] = useState(false);

  function starterPack(): void {
    const pack = localStorage.getItem("configurator");
    if (pack) {
      const parsed = JSON.parse(pack);
      // console.log("parsed", parsed.items[0]);
      dispatch(setChoosenCategory(parsed.categories));
      dispatch(setChoosenItem(parsed.items));
      dispatch(setProgressbarStyle(parsed.progress));
      dispatch(setPrimaryParts(parsed.primaries));
      dispatch(setTitle(parsed.title));
      dispatch(setDescription(parsed.description));
    }
  }

  const titleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
    const pack = localStorage.getItem("configurator");
    if (!pack) {
      localStorage.setItem(
        "configurator",
        JSON.stringify({
          title: e.target.value,
        })
      );
    } else {
      const updated = JSON.parse(pack);
      updated.title = e.target.value;
      localStorage.setItem("configurator", JSON.stringify(updated));
    }
  };

  const descriptionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDescription(e.target.value));
    const pack = localStorage.getItem("configurator");
    if (!pack) {
      localStorage.setItem(
        "configurator",
        JSON.stringify({
          description: e.target.value,
        })
      );
    } else {
      const updated = JSON.parse(pack);
      updated.description = e.target.value;
      localStorage.setItem("configurator", JSON.stringify(updated));
    }
  };

  useEffect(() => {
    dispatch(allCategoriesFetch(), starterPack());
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

  async function saveBtnHandler() {
    const pack = localStorage.getItem("configurator");
    if (!pack) {
      return;
    }
    if (primaryParts < primaryPartsTotalAmount) {
      toast.error("Выберите все обязательные комплектующие ПК ", {
        autoClose: 2000,
      });
      if (title === "") {
        toast.error("Введите название сборки", {
          autoClose: 2000,
        });
        return;
      }
      return;
    }
    const info = JSON.parse(pack);
    console.log({
      title: info.title,
      description: info.description,
      itemIdArr: info.items.map((el) => el.id),
    });
    await fetch("http://localhost:3000/configurator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: info.title,
        description: info.description,
        itemIdArr: info.items.map((el) => el.id),
      }),
    });
    localStorage.removeItem("configurator");
  }

  function ChooseHandler(
    id,
    significance,
    currentItemId,
    currentItemName,
    currentItemPrice,
    currentItemImg
  ): ChooseHandlerType {
    dispatch(
      ChooseHandlerFetch(
        id,
        significance,
        currentItemId,
        currentItemName,
        currentItemPrice,
        currentItemImg,
        choosenCategory,
        primaryParts,
        primaryPartsTotalAmount,
        choosenItem
      )
    );
  }

  function removeItemHandler(id, significance) {
    dispatch(
      removeItemHandlerFetch(
        id,
        significance,
        choosenCategory,
        primaryParts,
        primaryPartsTotalAmount,
        choosenItem,
        progressbarStyle
      )
    );
  }

  useEffect(() => {
    dispatch(categoryFetch(categoryId, setIsLoading));
  }, [categoryId]);

  function isCategoryChoosen(currentCategoryId) {
    return choosenCategory.findIndex((el) => el === currentCategoryId) === -1;
  }

  function getChoosenItem(currentCategoryId) {
    return choosenItem.find((el) => el.categoryId === currentCategoryId);
  }

  return (
    <>
      <div className="bg-gray-100 sm:grid grid-cols-5 grid-rows-2 px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
        <div className="h-max col-span-4 bg-gradient-to-tr from-gray-400 to-gray-200 rounded-md flex">
          <ul className="w-full">
            {categoriesArr &&
              categoriesArr.map((category) => (
                <li key={category.id}>
                  <div className="bg-white py-3 px-4 rounded-lg my-3 mx-3 flex justify-between items-center">
                    <div className="w-1/4 items-center flex-row flex">
                      <div className=" bg-purple-500 text-white shadow-lg shadow-purple-200 w-12 h-12 mr-2 relative">
                        <img
                          className="h-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                          src={`${category.image}`}
                          alt="category image"
                        />
                      </div>
                      {category.significance ? (
                        <span>{category.title}*</span>
                      ) : (
                        <span>{category.title}</span>
                      )}
                    </div>
                    {isCategoryChoosen(category.id) ? (
                      <span className="text-gray-500">
                        {category.amountItems} шт.
                      </span>
                    ) : (
                      <div className="flex justify-between gap-x-6 w-1/2">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8"
                            src={getChoosenItem(category.id)?.img}
                            alt="Neil image"
                          />
                        </div>
                        <div className="flex justify-left gap-x-4">
                          <div className="min-w-0 flex-auto ">
                            <p
                              onClick={() =>
                                navigate(
                                  `/product/${getChoosenItem(category.id)?.id}`
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
                        <div className="ml-10 sm:flex sm:flex-col sm:items-end w-1/4">
                          <p className="text-sm text-center leading-6 text-gray-900">
                            {getChoosenItem(category.id)?.price}₽
                          </p>
                        </div>
                      </div>
                    )}

                    {isCategoryChoosen(category.id) ? (
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
                value={title}
                onChange={titleInputHandler}
                type="text"
                placeholder="Введите название сборки"
                className=" bg-gray-100 rounded-md  outline-none pl-2 ring-indigo-700 w-full mr-2 p-2"
              />
            </div>

            <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
              <input
                value={description}
                onChange={descriptionInputHandler}
                type="text"
                placeholder="Введите описание сборки (необязательно)"
                className=" bg-gray-100 rounded-md  outline-none pl-2 ring-indigo-700 w-full mr-2 p-2 h-64"
              />
            </div>
            <div className="bg-white py-3 px-4 rounded-lg flex justify-around items-center ">
              <button
                onClick={() => saveBtnHandler()}
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
        ChooseHandler={ChooseHandler}
      />
    </>
  );
}
export default Configurator;
