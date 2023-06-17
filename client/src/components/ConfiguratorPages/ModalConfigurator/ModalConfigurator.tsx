import {
  choosenItemType,
  modalConfiguratorProps,
} from "../../../types/configurator.types";
import { Button, Modal } from "flowbite-react";
import { CategoryConfigurator } from "../CategoryConfigurator/CategoryConfigurator";
import { useAppDispatch } from "../../../redux/hook";
import {
  setChoosenCategory,
  setChoosenItem,
  setOpenModal,
  setPrimaryParts,
  setProgressbarStyle,
} from "../../../redux/slices/configuratorSlice";

function ModalConfigurator({
  openModal,
  categoryId,
  choosenCategory,
  primaryParts,
  primaryPartsTotalAmount,
  significance,
  categoryTitle,
  isLoading,
  categoryItems,
  choosenItem,
}: modalConfiguratorProps) {
  const dispatch = useAppDispatch();

  function ChooseHandler(
    id: number,
    significance: number,
    currentItemId: number,
    currentItemName: string,
    currentItemPrice: number
  ): void {
    const currentCategoryIndex = choosenCategory.findIndex(
      (el) => el.id === id
    );
    if (significance !== 0) {
      if (currentCategoryIndex !== -1) {
        if (choosenCategory[currentCategoryIndex].choosen === false) {
          dispatch(setPrimaryParts(primaryParts + 1));
          dispatch(
            setProgressbarStyle({
              width: `${Math.floor(
                ((primaryParts + 1) / primaryPartsTotalAmount) * 100
              )}%`,
            })
          );
        }
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
            },
          ])
        );
      }
      if (currentCategoryIndex === -1) {
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
            },
          ])
        );
      }
    } else {
      if (currentCategoryIndex !== -1) {
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
            },
          ])
        );
      }
      if (currentCategoryIndex === -1) {
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
            },
          ])
        );
      }
    }
    console.log(currentItemId);
    dispatch(setOpenModal(false));
  }

  if (isLoading) {
    return (
      <>
        <Modal
          dismissible
          show={openModal === true}
          size="7xl"
          onClose={() => dispatch(setOpenModal(false))}
        >
          <div className="flex items-center justify-between w-full px-4 py-4 border-b border-gray-200">
            <div className="px-4"> {categoryTitle} </div>
            <Button color="light" onClick={() => dispatch(setOpenModal(false))}>
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
