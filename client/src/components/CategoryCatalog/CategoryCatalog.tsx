import "./Category.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setCategory } from "../../redux/slices/catalogSlice";
import { RootState } from "../../redux/store/store";
import { useParams } from "react-router";
import { Dropdown } from "flowbite-react";
import { CategoryItem } from "./CategoryItem";
import { categoryFetch, sortThunk } from "../../redux/thunk/category.action";

export const CategoryCatalog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [priceData, setFormData] = useState({ low: "", high: "" });
  const [sortOption, setSortOption] = useState("");
  const [dropdawnLabel, setDropdawnLabel] = useState("Сортировка");

  const dispatch = useAppDispatch();
  const { catId } = useParams();

  useEffect(() => {
    dispatch(categoryFetch(catId, setIsLoading));
  }, []);

  const categoryItems = useAppSelector(
    (state: RootState) => state.catalog.category
  );
  // console.log(categoryItems);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value === 0) {
      setFormData({ ...priceData, [e.target.name]: 1 });
    } else {
      setFormData({ ...priceData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = () => {
    if (priceData.low && priceData.high) {
      const newCategoryItems = categoryItems.filter(
        (item) => item.price >= priceData.low && item.price <= priceData.high
      );
      dispatch(setCategory(newCategoryItems));
    }
  };

  if (isLoading) {
    return (
      <div className=" flex flex-col text-center  bg-white shadow-xl shadow-neutral-300 ">
        {/* <h1 className="mt-8 mb-8 text-center text-3xl font-semibold leading-7 text-gray-900 ">
          {categoryItems && categoryItems[0].category}
        </h1> */}
        <h1 className="text-3xl mt-8 mb-4 border-b border-gray-400 pb-10 font-semibold text-gray-800 leading-7 ">
          {categoryItems && categoryItems[0].category}
        </h1>
        <div className="flex justify-center">
          <div className="mt-10 mb-10 mr-10">
            <Dropdown
              color="dark"
              label={dropdawnLabel}
              outline
              // className="border-8 border-black"
            >
              <Dropdown.Item
                onClick={() => {
                  setSortOption("popularity"),
                    dispatch(
                      sortThunk(
                        "popularity",
                        setSortOption,
                        setDropdawnLabel,
                        categoryItems
                      )
                    );
                }}
              >
                По популярности
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSortOption("priceLow"),
                    dispatch(
                      sortThunk(
                        "priceLow",
                        setSortOption,
                        setDropdawnLabel,
                        categoryItems
                      )
                    );
                }}
              >
                По цене (сначала дешевле)
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSortOption("priceHigh"),
                    dispatch(
                      sortThunk(
                        "priceHigh",
                        setSortOption,
                        setDropdawnLabel,
                        categoryItems
                      )
                    );
                }}
              >
                По цене (сначала дороже)
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSortOption("nameAsc"),
                    dispatch(
                      sortThunk(
                        "nameAsc",
                        setSortOption,
                        setDropdawnLabel,
                        categoryItems
                      )
                    );
                }}
              >
                По названию (А-Я)
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSortOption("nameDesc"),
                    dispatch(
                      sortThunk(
                        "nameDesc",
                        setSortOption,
                        setDropdawnLabel,
                        categoryItems
                      )
                    );
                }}
              >
                По названию (Я-А)
              </Dropdown.Item>
            </Dropdown>
          </div>
          <div className="mt-10 mb-10">
            <span className="mr-4">Цена от</span>
            <input
              onChange={changeHandler}
              value={priceData?.low}
              name="low"
              type="number"
              min="1"
              className="border-2 rounded-lg border-black h-11 pl-4"
            />
            <span className="mr-4 ml-4">до</span>
            <input
              onChange={changeHandler}
              value={priceData?.high}
              name="high"
              type="number"
              min="1"
              className="border-2 rounded-lg border-black h-11 pl-4"
            />
            <button
              onClick={submitHandler}
              type="button"
              className="ml-4 text-gray-900 bg-white border-2 border-gray-800 focus:outline-none active:bg-gray-800 active:text-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Применить
            </button>
          </div>
        </div>
        <div className="w-full mx-auto max-w-screen-xl mt-10 grid group  ">
          <ul role="list" className="divide-y-2 divide-gray-500">
            {categoryItems &&
              categoryItems.map((item) => (
                <CategoryItem el={item} key={item.id} />
              ))}
          </ul>
        </div>
      </div>
    );
  }
};
