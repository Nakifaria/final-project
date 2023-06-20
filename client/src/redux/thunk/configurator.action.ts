import { toast } from "react-toastify";
import { startLoad } from "../slices/loader.slice";
import {
  setCategoriesArr,
  setChoosenCategory,
  setChoosenItem,
  setOpenModal,
  setPrimaryParts,
  setPrimaryPartsTotalAmount,
  setProgressbarStyle,
} from "../slices/configuratorSlice";

export const allCategoriesFetch = () => async (dispatch) => {
  try {
    console.log("Я САНК 2");
    const response = await fetch("http://localhost:3000/configurator", {
      credentials: "include",
    });
    const result = await response.json();
    dispatch(setCategoriesArr(result.categoriesArr));
    dispatch(setPrimaryPartsTotalAmount(result.primaryPartsTotalAmount));
  } catch (error) {
    toast.error("Непредусмотренная ошибка", { autoClose: 2000 });
    console.log(error);
    dispatch(startLoad(false));
  }
};

export const removeItemHandlerFetch =
  (
    id,
    significance,
    choosenCategory,
    primaryParts,
    primaryPartsTotalAmount,
    choosenItem
  ): void =>
  (dispatch) => {
    try {
      if (significance !== 0) {
        dispatch(setPrimaryParts(primaryParts - 1));
        dispatch(
          setProgressbarStyle({
            width: `${Math.floor(
              ((primaryParts - 1) / primaryPartsTotalAmount) * 100
            )}%`,
          })
        );
      }
      dispatch(setChoosenCategory(choosenCategory.filter((el) => el !== id)));
      dispatch(
        setChoosenItem(choosenItem.filter((el) => el.categoryId !== id))
      );
      removeConfiguratorItemsFromLocalStorage(id);
    } catch (error) {
      toast.error("Непредусмотренная ошибка", { autoClose: 2000 });
      console.log(error);
      dispatch(startLoad(false));
    }
  };

export const ChooseHandlerFetch =
  (
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
  ): void =>
  (dispatch) => {
    if (significance !== 0) {
      dispatch(setChoosenCategory([...choosenCategory, id]));
      dispatch(setPrimaryParts(primaryParts + 1));
      dispatch(
        setProgressbarStyle({
          width: `${Math.floor(
            ((primaryParts + 1) / primaryPartsTotalAmount) * 100
          )}%`,
        })
      );
    }
    dispatch(setChoosenCategory([...choosenCategory, id]));
    dispatch(
      setChoosenItem([
        ...choosenItem,
        {
          id: currentItemId,
          name: currentItemName,
          price: currentItemPrice,
          categoryId: id,
          img: currentItemImg,
        },
      ])
    );
    addConfiguratorItemsToLocalStorage(
      id,
      currentItemId,
      currentItemName,
      currentItemPrice,
      currentItemImg
    );

    dispatch(setOpenModal(false));
  };

const addConfiguratorItemsToLocalStorage = (
  id,
  currentItemId,
  currentItemName,
  currentItemPrice,
  currentItemImg
) => {
  const pack = localStorage.getItem("configurator");

  if (!pack) {
    localStorage.setItem(
      "configurator",
      JSON.stringify({
        categories: [id],
        items: [
          {
            id: currentItemId,
            name: currentItemName,
            price: currentItemPrice,
            categoryId: id,
            img: currentItemImg,
          },
        ],
      })
    );
  } else {
    const updated = JSON.parse(pack);

    updated.categories.push(id);
    updated.items.push({
      id: currentItemId,
      name: currentItemName,
      price: currentItemPrice,
      categoryId: id,
      img: currentItemImg,
    });

    localStorage.setItem("configurator", JSON.stringify(updated));
  }
};

const removeConfiguratorItemsFromLocalStorage = (id: number) => {
  const pack = localStorage.getItem("configurator");

  const updated = pack && JSON.parse(pack);

  const spliceIndex = updated.categories.indexOf(id);

  updated.categories.splice(spliceIndex, 1);

  updated.items = updated.items.filter((el) => el.categoryId !== id);

  localStorage.setItem("configurator", JSON.stringify(updated));
};
