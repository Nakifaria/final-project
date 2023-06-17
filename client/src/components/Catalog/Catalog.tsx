import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setCatalog } from "../../redux/slices/catalogSlice";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router";

export const Catalog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const catalogData = async () => {
    try {
      const response = await fetch("http://localhost:3000/configurator");

      const catalogData = await response.json();
      console.log(catalogData.categoriesArr);
      dispatch(setCatalog(catalogData.categoriesArr));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    catalogData();
  }, []);

  const catalog = useAppSelector((state: RootState) => state.catalog.catalog);
    console.log(catalog);

  return (
    <div>
      <div className="mt-[30px] flex flex-col text-center">
        <h1 className="text-center text-2xl font-semibold leading-7 text-gray-900">
          Каталог товаров
        </h1>

        <div>
          <button
            onClick={() => {
              navigate("/configurator");
            }}
            className="mt-10 bg-gray-800 hover:bg-gray-900 text-white p-6 rounded text-2xl font-bold overflow-hidden"
          >
            Собрать ПК
          </button>
        </div>

        <div className=" mx-auto max-w-screen-lg mt-10 grid grid-cols-1 md:lg:xl:grid-cols-3 group bg-white shadow-xl shadow-neutral-100 border ">
          {catalog &&
            catalog.map((el) => (
              <div
                onClick={() => navigate(`/category/${el.id}`)}
                key={el.id}
                className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer"
              >
                <span className="p-5 rounded-full bg-red-500 text-white shadow-lg shadow-red-200">
                 <img className="w-14 h-14" src={el.image}/>
                </span>
                <p className="text-xl font-medium text-slate-700 mt-3">
                  {el.title}
                </p>
                <p className="mt-2 text-sm text-slate-500">Количество товаров: {el.amountItems} шт.</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
