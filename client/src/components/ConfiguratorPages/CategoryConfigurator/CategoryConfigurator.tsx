import { useNavigate } from "react-router-dom";

export const CategoryConfigurator = ({
  categoryTitle,
  categoryItems,
  categoryId,
  significance,
  ChooseHandler,
}) => {
  const navigate = useNavigate();
  // console.log("categoryItems", categoryItems[0]?.description?.["Socket Type"]);
  // console.log("categoryItems", categoryItems[0]?.description?.["Form Factor"]);
  // console.log("categoryItems", categoryItems[0]?.description?.["Memory Type"]);
  // console.log("categoryItems", categoryItems[0]?.description?.["Power"]);
  // console.log(
  //   "categoryItems",
  //   categoryItems[0]?.description?.["Recommended Power Supply"]
  // );
  console.log("categoryItems", categoryItems);
  return (
    <div className="flex flex-col text-center w-full">
      <div className=" mt-10 bg-white shadow-xl shadow-neutral-100 h-full">
        <ul className="divide-y divide-gray-100 w-full">
          {categoryItems &&
            categoryItems.map((el) => (
              <li
                key={el.id}
                className="flex justify-between gap-x-6 py-5 w-full"
              >
                <div
                  onClick={() => navigate(`/product/${el.id}`)}
                  className="flex justify-between gap-x-6 w-4/5"
                >
                  <div className="flex-shrink-0">
                    <img className="w-14 h-14" src={el.img} alt="Neil image" />
                  </div>
                  <div className="flex justify-left gap-x-4 items-center">
                    <div className="min-w-0 flex-auto ">
                      <p className="text-base text-center font-bold leading-6 text-gray-900">
                        {el.name}
                      </p>
                    </div>
                  </div>
                  <div className="ml-10 sm:flex sm:flex-col sm:items-end flex flex-col justify-center">
                    <p className="text-base text-center leading-6 text-gray-900">
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
                        el.img,
                        el.description?.["Socket Type"]
                        // el.description?.["Form Factor"]
                        // el.description?.["Memory Type"]
                        // el.description?.["Power"]
                        // el.description?.["Recommended Power Supply"]
                      )
                    }
                    type="button"
                    className="text-white w-32 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
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
