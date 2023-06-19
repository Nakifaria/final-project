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
    id: number,
    significance: number,
    choosenCategory,
    primaryParts,
    primaryPartsTotalAmount
  ): void =>
  (dispatch) => {
    try {
      const currentCategoryIndex = choosenCategory.findIndex(
        (el) => el.id === id
      );
      if (significance !== 0) {
        dispatch(setPrimaryParts(primaryParts - 1));
        dispatch(
          setProgressbarStyle({
            width: `${Math.floor(
              ((primaryParts - 1) / primaryPartsTotalAmount) * 100
            )}%`,
          })
        );
        const added = !choosenCategory[currentCategoryIndex].choosen;
        dispatch(
          setChoosenCategory([
            ...choosenCategory.filter((el) => el.id !== id),
            { id, choosen: added },
          ])
        );
      } else {
        const added = !choosenCategory[currentCategoryIndex].choosen;
        dispatch(
          setChoosenCategory([
            ...choosenCategory.filter((el) => el.id !== id),
            { id, choosen: added },
          ])
        );
      }
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
    const currentCategoryIndex = choosenCategory.findIndex(
      (el) => el.id === id
    );
    if (significance !== 0) {
      console.log("Условие 1");
      if (currentCategoryIndex !== -1) {
        console.log("Условие 1.1");
        if (choosenCategory[currentCategoryIndex].choosen === false) {
          console.log("Условие 1.1.1");
          dispatch(setPrimaryParts(primaryParts + 1));
          dispatch(
            setProgressbarStyle({
              width: `${Math.floor(
                ((primaryParts + 1) / primaryPartsTotalAmount) * 100
              )}%`,
            })
          );
        }
        console.log("Условие 1.1.2");
        const added = !choosenCategory[currentCategoryIndex].choosen;
        dispatch(
          setChoosenCategory([
            ...choosenCategory.filter((el) => el.id !== id),
            { id, choosen: added },
          ])
        );
        dispatch(
          setChoosenItem([
            ...choosenItem.filter((el) => el.categoryId !== id),
            {
              id: currentItemId,
              name: currentItemName,
              price: currentItemPrice,
              categoryId: id,
              img: currentItemImg,
            },
          ])
        );
      }
      if (currentCategoryIndex === -1) {
        console.log("Условие 1.2");
        dispatch(
          setChoosenCategory([...choosenCategory, { id, choosen: true }])
        );
        dispatch(setPrimaryParts(primaryParts + 1));
        dispatch(
          setProgressbarStyle({
            width: `${Math.floor(
              ((primaryParts + 1) / primaryPartsTotalAmount) * 100
            )}%`,
          })
        );
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
      }
    } else {
      console.log("Условие 2");
      if (currentCategoryIndex !== -1) {
        console.log("Условие 2.1");
        const added = !choosenCategory[currentCategoryIndex].choosen;
        dispatch(
          setChoosenCategory([
            ...choosenCategory.filter((el) => el.id !== id),
            { id, choosen: added },
          ])
        );
        dispatch(
          setChoosenItem([
            ...choosenItem.filter((el) => el.categoryId !== id),
            {
              id: currentItemId,
              name: currentItemName,
              price: currentItemPrice,
              categoryId: id,
              img: currentItemImg,
            },
          ])
        );
      }
      if (currentCategoryIndex === -1) {
        console.log("Условие 2.2");
        dispatch(
          setChoosenCategory([...choosenCategory, { id, choosen: true }])
        );
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
      }
    }
    dispatch(setOpenModal(false));
  };

const addToLocalStorage = (id: number, packName: string) => {
  const pack = localStorage.getItem(packName);

  if (!pack) {
    localStorage.setItem(
      packName,
      JSON.stringify({
        items: [id],
      })
    );
  } else {
    const updated: IPack = JSON.parse(pack);

    updated.items.push(id);

    localStorage.setItem(packName, JSON.stringify(updated));
  }
};
