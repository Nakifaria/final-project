
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setCatalog } from '../../redux/slices/catalogSlice';
import { RootState } from '../../redux/store/store';
import { useNavigate } from 'react-router';


export const Catalog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const navigate = useNavigate();

  const catalogData = async () => {
    try {

      const response = await fetch('http://localhost:3000/catalog');

      const catalogData = await response.json();
      // console.log(catalogData);
      dispatch(setCatalog(catalogData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    catalogData();
  }, []);

  const catalog = useAppSelector((state: RootState) => state.catalog.catalog);
  //   console.log(catalog);

  return (
    <div>
      <div className="mt-[30px] flex flex-col text-center">
        <h1 className="text-center text-2xl font-semibold leading-7 text-gray-900">
          Каталог товаров
        </h1>

        <div>
          <button
            onClick={() => {
              navigate('/configurator');
            }}
            className=" mt-10 bg-blue-500 text-white p-6 rounded text-2xl font-bold overflow-hidden"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </span>
                <p className="text-xl font-medium text-slate-700 mt-3">
                  {el.title}
                </p>
                <p className="mt-2 text-sm text-slate-500">Кол-во товаров</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
