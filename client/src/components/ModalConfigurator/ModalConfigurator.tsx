import { modalConfiguratorProps } from "../../types/configurator.types";
import { Button, Modal } from "flowbite-react";
import { CategoryConfigurator } from "../CategoryConfigurator/CategoryConfigurator";

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
}: modalConfiguratorProps) {
  function ChooseHandler(id: number, significance: number): void {
    const currentCategoryIndex = choosenCategory.findIndex(
      (el) => el.id === id
    );
    if (significance !== 0) {
      if (currentCategoryIndex !== -1) {
        if (choosenCategory[currentCategoryIndex].choosen === false) {
          setPrimaryParts((prevState) => prevState + 1);
          setProgressbarStyle({
            width: `${Math.floor(
              ((primaryParts + 1) / primaryPartsTotalAmount) * 100
            )}%`,
          });
        }
        setChoosenCategory((prevState) => {
          const added = !choosenCategory[currentCategoryIndex].choosen;
          return [
            ...prevState.filter((el) => el.id !== id),
            { id, choosen: added },
          ];
        });
      }
      if (currentCategoryIndex === -1) {
        setChoosenCategory([...choosenCategory, { id, choosen: true }]);
        setPrimaryParts((prevState) => prevState + 1);
        setProgressbarStyle({
          width: `${Math.floor(
            ((primaryParts + 1) / primaryPartsTotalAmount) * 100
          )}%`,
        });
      }
    } else {
      if (currentCategoryIndex !== -1) {
        setChoosenCategory((prevState) => {
          const added = !choosenCategory[currentCategoryIndex].choosen;
          return [
            ...prevState.filter((el) => el.id !== id),
            { id, choosen: added },
          ];
        });
      }
      if (currentCategoryIndex === -1) {
        setChoosenCategory([...choosenCategory, { id, choosen: true }]);
      }
    }
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
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => ChooseHandler(categoryId, significance)}
              gradientDuoTone="tealToLime"
              outline
            >
              Добавить
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default ModalConfigurator;
