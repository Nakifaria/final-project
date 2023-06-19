import {
  choosenItemType,
  modalConfiguratorProps,
} from "../../../types/configurator.types";
import { Button, Modal } from "flowbite-react";
import { CategoryConfigurator } from "../CategoryConfigurator/CategoryConfigurator";
import { useAppDispatch } from "../../../redux/hook";
import { setOpenModal } from "../../../redux/slices/configuratorSlice";
import { ChooseHandlerFetch } from "../../../redux/thunk/configurator.action";

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
    dispatch(
      ChooseHandlerFetch(
        id,
        significance,
        currentItemId,
        currentItemName,
        currentItemPrice,
        choosenCategory,
        primaryParts,
        primaryPartsTotalAmount,
        choosenItem
      )
    );
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
