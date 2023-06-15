import { useEffect, useState } from "react";
import { category, choosenCategory } from "../../types/configurator.types";
import ModalConfigurator from "../ModalConfigurator/ModalConfigurator";
import { Button } from "flowbite-react";

function Configurator() {
  const [categoriesArr, setCategoriesArr] = useState<category[]>([]);
  const [primaryParts, setPrimaryParts] = useState<number>(0);
  const [primaryPartsTotalAmount, setPrimaryPartsTotalAmount] =
    useState<number>(0);
  const [progressbarStyle, setProgressbarStyle] = useState<object>({
    width: "0",
  });
  const [choosenCategory, setChoosenCategory] = useState<choosenCategory[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch("http://localhost:3000/configurator", {
          credentials: "include",
        });
        const result = await response.json();
        setCategoriesArr(result.categoriesArr);
        setPrimaryPartsTotalAmount(result.primaryPartsTotalAmount);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function removeItemHandler(id: number, significance: number): void {
    const currentCategoryIndex = choosenCategory.findIndex(
      (el) => el.id === id
    );
    if (significance !== 0) {
      if (choosenCategory[currentCategoryIndex].choosen) {
        setPrimaryParts((prevState) => prevState - 1);
        setProgressbarStyle({
          width: `${Math.floor(
            ((primaryParts - 1) / primaryPartsTotalAmount) * 100
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
    }
  }

  // ------------------------------

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [significance, setSignificance] = useState<number>(0);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  function openModalHandler(
    id: number,
    significance: number,
    categoryTitle: string
  ) {
    setOpenModal(true);
    setCategoryId(id);
    setSignificance(significance);
    setCategoryTitle(categoryTitle);
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
                    {category.significance ? (
                      <span className="w-1/12">{category.title}*</span>
                    ) : (
                      <span className="w-1/12">{category.title}</span>
                    )}
                    <span className="text-gray-500">
                      {category.amountItems} шт.
                    </span>

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
        setOpenModal={setOpenModal}
        categoryId={categoryId}
        setProgressbarStyle={setProgressbarStyle}
        choosenCategory={choosenCategory}
        setChoosenCategory={setChoosenCategory}
        setPrimaryParts={setPrimaryParts}
        primaryParts={primaryParts}
        primaryPartsTotalAmount={primaryPartsTotalAmount}
        significance={significance}
        categoryTitle={categoryTitle}
      />
    </>
  );
}
export default Configurator;
