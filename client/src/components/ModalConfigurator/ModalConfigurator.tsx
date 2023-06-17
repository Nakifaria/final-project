import {
  choosenItemType,
  modalConfiguratorProps,
} from "../../types/configurator.types";
import { Button, Modal } from "flowbite-react";
import { CategoryConfigurator } from "../CategoryConfigurator/CategoryConfigurator";
import { current } from "@reduxjs/toolkit";

function ModalConfigurator({
  openModal,
  setOpenModal,
  categoryId,
  setProgressbarStyle,
  choosenCategory,
  setChoosenCategory,
  primaryParts,
  primaryPartsTotalAmount,
  setPrimaryParts,
  significance,
  categoryTitle,
  isLoading,
  categoryItems,

  setChoosenItem,
}: modalConfiguratorProps) {
  function ChooseHandler(
    id: number,
    significance: number,
    currentItemId: number,
    currentItemName: string,
    currentItemPrice: number,
    setChoosenItem
  ): void {
    const currentCategoryIndex = choosenCategory.findIndex(
      (el) => el.id === id
    );
    if (significance !== 0) {
      if (currentCategoryIndex !== -1) {
        // console.log("Первый");
        if (choosenCategory[currentCategoryIndex].choosen === false) {
          setPrimaryParts((prevState) => prevState + 1);
          setProgressbarStyle({
            width: `${Math.floor(
              ((primaryParts + 1) / primaryPartsTotalAmount) * 100
            )}%`,
          });
        }
        setChoosenCategory((prevState) => {
          // console.log("Второй");
          const added = !choosenCategory[currentCategoryIndex].choosen;
          return [
            ...prevState.filter((el) => el.id !== id),
            { id, choosen: added },
          ];
        });
        setChoosenItem((prevState) => [
          ...prevState.filter((el) => el.categoryId !== id),
          {
            id: currentItemId,
            name: currentItemName,
            price: currentItemPrice,
            categoryId: id,
          },
        ]);
      }
      if (currentCategoryIndex === -1) {
        // console.log("Третий");
        setChoosenCategory([...choosenCategory, { id, choosen: true }]);
        setPrimaryParts((prevState) => prevState + 1);
        setProgressbarStyle({
          width: `${Math.floor(
            ((primaryParts + 1) / primaryPartsTotalAmount) * 100
          )}%`,
        });
        setChoosenItem((prevState) => [
          ...prevState,
          {
            id: currentItemId,
            name: currentItemName,
            price: currentItemPrice,
            categoryId: id,
          },
        ]);
      }
    } else {
      if (currentCategoryIndex !== -1) {
        // console.log("Четвёртый");
        setChoosenCategory((prevState) => {
          const added = !choosenCategory[currentCategoryIndex].choosen;
          return [
            ...prevState.filter((el) => el.id !== id),
            { id, choosen: added },
          ];
        });
        setChoosenItem((prevState) => [
          ...prevState.filter((el) => el.categoryId !== id),
          {
            id: currentItemId,
            name: currentItemName,
            price: currentItemPrice,
            categoryId: id,
          },
        ]);
      }
      if (currentCategoryIndex === -1) {
        // console.log("Пятый");
        setChoosenCategory([...choosenCategory, { id, choosen: true }]);
        setChoosenItem((prevState) => [
          ...prevState,
          {
            id: currentItemId,
            name: currentItemName,
            price: currentItemPrice,
            categoryId: id,
          },
        ]);
      }
    }
    console.log(currentItemId);
    setOpenModal(false);
  }

  if (isLoading) {
    return (
      <>
        <Modal
          dismissible
          show={openModal === true}
          size="7xl"
          onClose={() => setOpenModal(false)}
        >
          <div className="flex items-center justify-between w-full px-4 py-4 border-b border-gray-200">
            <div className="px-4"> {categoryTitle} </div>
            <Button color="light" onClick={() => setOpenModal(false)}>
              X Закрыть
            </Button>
          </div>

          <Modal.Body>
            <div className="space-y-6 p-6">
              <CategoryConfigurator
                categoryTitle={categoryTitle}
                categoryItems={categoryItems}
                categoryId={categoryId}
                significance={significance}
                ChooseHandler={ChooseHandler}
                setChoosenItem={setChoosenItem}
              />
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default ModalConfigurator;
