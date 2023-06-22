import { toast } from "react-toastify";
import { startLoad } from "../slices/loader.slice";
import {
  setCategoriesArr,
  setChoosenCategory,
  setChoosenItem,
  setConfigurationSocketMistake,
  setFirstSocketType,
  setOpenModal,
  setPrimaryParts,
  setPrimaryPartsTotalAmount,
  setProgressbarStyle,
  setSecondSocketType,
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
    choosenItem,
    firstSocketType,
    secondSocketType,
    configurationSocketMistake
  ): void =>
  (dispatch) => {
    try {
      if (significance) {
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
      removeConfiguratorItemsFromLocalStorage(
        id,
        primaryParts,
        primaryPartsTotalAmount,
        significance
      );

      const pack = localStorage.getItem("configurator");
      const updated = JSON.parse(pack);
      console.log("firstSocketType------>", firstSocketType);
      console.log("secondSocketType------>", secondSocketType);
      if (firstSocketType.categoryId === id) {
        console.log("TUT");
        dispatch(setFirstSocketType({ categoryId: 0, socketName: "" }));
        dispatch(setConfigurationSocketMistake(""));
        updated.firstSocket = { categoryId: 0, socketName: "" };
        if (configurationSocketMistake !== "") {
          updated.socketMistake = "";
        }

        localStorage.setItem("configurator", JSON.stringify(updated));
      }
      if (secondSocketType.categoryId === id) {
        console.log("TUT2");
        dispatch(setSecondSocketType({ categoryId: 0, socketName: "" }));
        dispatch(setConfigurationSocketMistake(""));
        updated.secondSocket = { categoryId: 0, socketName: "" };
        if (configurationSocketMistake !== "") {
          updated.socketMistake = "";
        }
        localStorage.setItem("configurator", JSON.stringify(updated));
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
    choosenItem,
    firstSocketType,
    secondSocketType,
    currentSocketType
  ): void =>
  (dispatch) => {
    if (significance) {
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
      currentItemImg,
      primaryParts,
      primaryPartsTotalAmount,
      significance
    );
    const pack = localStorage.getItem("configurator");

    if (
      (firstSocketType?.socketName === "" ||
        firstSocketType?.categoryId === id) &&
      currentSocketType !== undefined
    ) {
      dispatch(
        setFirstSocketType({
          categoryId: id,
          socketName: currentSocketType,
        })
      );
      if (!pack) {
        localStorage.setItem(
          "configurator",
          JSON.stringify({
            firstSocket: {
              categoryId: id,
              socketName: currentSocketType,
            },
          })
        );
      } else {
        const updated = JSON.parse(pack);
        updated.firstSocket = {
          categoryId: id,
          socketName: currentSocketType,
        };
        localStorage.setItem("configurator", JSON.stringify(updated));
      }

      if (
        currentSocketType !== secondSocketType?.socketName &&
        secondSocketType?.socketName !== ""
      ) {
        dispatch(
          setConfigurationSocketMistake(
            "Сокеты процессора и материнской платы несовместимы"
          )
        );
        const pack = localStorage.getItem("configurator");
        if (!pack) {
          localStorage.setItem(
            "configurator",
            JSON.stringify({
              socketMistake:
                "Сокеты процессора и материнской платы несовместимы",
            })
          );
        } else {
          const updated = JSON.parse(pack);
          updated.socketMistake =
            "Сокеты процессора и материнской платы несовместимы";
          localStorage.setItem("configurator", JSON.stringify(updated));
        }
      }
    } else if (
      (secondSocketType?.socketName === "" ||
        secondSocketType?.categoryId === id) &&
      currentSocketType !== undefined
      // && firstSocketType.categoryId !== id &&
      // firstSocketType.socketName !== currentSocketType
    ) {
      dispatch(
        setSecondSocketType({
          categoryId: id,
          socketName: currentSocketType,
        })
      );

      if (!pack) {
        localStorage.setItem(
          "configurator",
          JSON.stringify({
            secondSocket: {
              categoryId: id,
              socketName: currentSocketType,
            },
          })
        );
      } else {
        const updated = JSON.parse(pack);
        updated.secondSocket = {
          categoryId: id,
          socketName: currentSocketType,
        };
        localStorage.setItem("configurator", JSON.stringify(updated));
      }
      if (
        firstSocketType?.socketName !== currentSocketType &&
        firstSocketType?.socketName !== ""
      ) {
        dispatch(
          setConfigurationSocketMistake(
            "Сокеты процессора и материнской платы несовместимы"
          )
        );
        const pack = localStorage.getItem("configurator");
        if (!pack) {
          localStorage.setItem(
            "configurator",
            JSON.stringify({
              socketMistake:
                "Сокеты процессора и материнской платы несовместимы",
            })
          );
        } else {
          const updated = JSON.parse(pack);
          updated.socketMistake =
            "Сокеты процессора и материнской платы несовместимы";
          localStorage.setItem("configurator", JSON.stringify(updated));
        }
      }
    }

    // ---------------------

    dispatch(setOpenModal(false));
  };

const addConfiguratorItemsToLocalStorage = (
  id,
  currentItemId,
  currentItemName,
  currentItemPrice,
  currentItemImg,
  primaryParts,
  primaryPartsTotalAmount,
  significance
) => {
  const pack = localStorage.getItem("configurator");

  if (!pack) {
    if (significance) {
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
          primaries: primaryParts + 1,
          progress: {
            width: `${Math.floor(
              ((primaryParts + 1) / primaryPartsTotalAmount) * 100
            )}%`,
          },
        })
      );
    } else {
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
    }
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

    if (significance) {
      updated.primaries = primaryParts + 1;
      updated.progress = {
        width: `${Math.floor(
          ((primaryParts + 1) / primaryPartsTotalAmount) * 100
        )}%`,
      };
    }

    localStorage.setItem("configurator", JSON.stringify(updated));
  }
};

const removeConfiguratorItemsFromLocalStorage = (
  id: number,
  primaryParts,
  primaryPartsTotalAmount,
  significance
) => {
  const pack = localStorage.getItem("configurator");
  const updated = pack && JSON.parse(pack);
  const spliceIndex = updated.categories.indexOf(id);
  updated.categories.splice(spliceIndex, 1);
  updated.items = updated.items.filter((el) => el.categoryId !== id);
  if (significance) {
    updated.primaries = primaryParts - 1;
    updated.progress = {
      width: `${Math.floor(
        ((primaryParts - 1) / primaryPartsTotalAmount) * 100
      )}%`,
    };
  }

  localStorage.setItem("configurator", JSON.stringify(updated));
};
