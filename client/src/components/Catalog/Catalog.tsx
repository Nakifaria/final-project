import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setCatalog } from "../../redux/slices/catalogSlice";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router";
import { SVGComponent } from "../Svg/SVGComponent";

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
    <div className="bg-white shadow-xl shadow-neutral-300">
      <div className="mt-8 flex flex-col text-center">
        {/* <h1 className="text-center text-3xl font-semibold leading-7 text-gray-900">
          Каталог товаров
        </h1> */}

        <h1 className="text-3xl mb-4 border-b font-semibold border-gray-400 pb-10 text-gray-900 leading-7">
          Каталог товаров
        </h1>

        <div className="flex flex-col text-center">
          <button
            onClick={() => {
              navigate("/configurator");
            }}
            className="flex flex-col items-center text-center mt-6 bg-red-800 hover:bg-red-700 text-white p-6 rounded text-2xl font-bold overflow-hidden"
          >
            <div className="h-10 w-10">
              <SVGComponent svgName="config" />
            </div>
            <div>Собрать ПК</div>
          </button>
        </div>

        <div className=" w-full  max-w-screen-2xl mt-10 grid grid-cols-1 md:lg:xl:grid-cols-3 group ">
          {catalog &&
            catalog.map((el) => (
              <div
                onClick={() => navigate(`/category/${el.id}`)}
                key={el.id}
                className="p-10 shadow-xl shadow-neutral-100 border bg-gray-800 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-500 cursor-pointer"
              >
                <span className="">
                  <img className="w-14 h-14" src={el.image} />
                </span>
                <p className="text-xl font-medium text-white mt-3">
                  {el.title}
                </p>
                <p className="mt-2 text-sm text-white">
                  Количество товаров: {el.amountItems} шт.
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
