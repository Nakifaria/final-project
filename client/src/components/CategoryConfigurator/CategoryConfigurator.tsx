import { ReactSVG } from "react-svg";
import { Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export const CategoryConfigurator = ({
  categoryTitle,
  categoryItems,
  categoryId,
  significance,
  ChooseHandler,
  setChoosenItem,
}) => {
  const navigate = useNavigate();
  return (
    <div className="mt-[30px] flex flex-col text-center w-full">
      <h1 className="text-center text-2xl font-semibold leading-7 text-gray-900">
        {categoryTitle}
      </h1>
      <div className="mt-10">фильтр</div>
      <div className=" mt-10 bg-white shadow-xl shadow-neutral-100 border ">
        <ul className="divide-y divide-gray-100 w-full">
          {categoryItems &&
            categoryItems.map((el) => (
              <li
                key={el.id}
                className="flex justify-between gap-x-6 py-5 w-full"
              >
                <div
                  onClick={() => navigate(`/product/${el.id}`)}
                  className="flex justify-between gap-x-6 w-3/5"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8"
                      src="https://cdn1.ozone.ru/s3/multimedia-2/6368709194.jpg"
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex justify-left gap-x-4">
                    <div className="min-w-0 flex-auto ">
                      <p className="text-sm text-center font-bold leading-6 text-gray-900">
                        {el.name}
                      </p>
                    </div>
                  </div>
                  <div className="ml-10 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm text-center leading-6 text-gray-900">
                      {el.price} ₽
                    </p>
                  </div>
                </div>
                <div className="sm:flex sm:items-end">
                  <button
                    onClick={() =>
                      ChooseHandler(
                        categoryId,
                        significance,
                        el.id,
                        el.name,
                        el.price,
                        setChoosenItem
                      )
                    }
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                  >
                    Добавить
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};