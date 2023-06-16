import { ReactSVG } from "react-svg";
import { Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export const CategoryConfigurator = ({ categoryTitle, categoryItems }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-[30px] flex flex-col text-center">
      <h1 className="text-center text-2xl font-semibold leading-7 text-gray-900">
        {categoryTitle}
      </h1>
      <div className="mt-10">
        {/* Цена от
        <input
          onChange={changeHandler}
          value={priceData?.low}
          name="low"
          type="text"
          className="border rounded border-black"
        />
        до
        <input
          onChange={changeHandler}
          value={priceData?.high}
          name="high"
          type="text"
          className="border rounded border-black"
        />
        <button
          onClick={submitHandler}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Применить
        </button>
        <Dropdown color="light" label="Сортировка">
          <Dropdown.Item onClick={() => setSortOption("popularity")}>
            По популярности
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOption("priceLow")}>
            По цене (сначала дешевле)
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOption("priceHigh")}>
            По цене (сначала дороже)
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOption("nameAsc")}>
            По названию (А-Я)
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOption("nameDesc")}>
            По названию (Я-А)
          </Dropdown.Item>
        </Dropdown> */}
      </div>
      <div className=" mx-auto max-w-screen-xl mt-10 grid  group bg-white shadow-xl shadow-neutral-100 border ">
        <ul role="list" className="divide-y divide-gray-100">
          {categoryItems &&
            categoryItems.map((el) => (
              <li key={el.id} className="flex justify-between gap-x-6 py-5">
                <div
                  onClick={() => navigate(`/product/${el.id}`)}
                  className="flex justify-between gap-x-6"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8"
                      src="https://cdn1.ozone.ru/s3/multimedia-2/6368709194.jpg"
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex justify-left gap-x-4">
                    <div className="min-w-0 flex-auto">
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
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
                  >
                    <ReactSVG src="cart.svg" className="w-6" />
                  </button>
                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    <ReactSVG src="sravnenie.svg" className="w-6" />
                  </button>
                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    <ReactSVG src="favourite.svg" className="w-6" />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
