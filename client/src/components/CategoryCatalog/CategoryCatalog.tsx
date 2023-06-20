import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setCategory } from '../../redux/slices/catalogSlice';
import { RootState } from '../../redux/store/store';
import { useNavigate, useParams } from 'react-router';
import { Dropdown } from 'flowbite-react';
import { CategoryItem } from './CategoryItem';

export const CategoryCatalog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [priceData, setFormData] = useState({ low: '', high: '' });
  const [sortOption, setSortOption] = useState('');
  const [dropdawnLabel, setDropdawnLabel] = useState('Сортировка');

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { catId } = useParams();

  const categoryData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/catalog/category/${catId}`
      );

      const categoryData = await response.json();
      dispatch(setCategory(categoryData));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    categoryData();
  }, []);

  const categoryItems = useAppSelector(
    (state: RootState) => state.catalog.category
  );
  console.log(categoryItems);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...priceData, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    if (priceData.low && priceData.high) {
      const newCategoryItems = categoryItems.filter(
        (item) => item.price >= priceData.low && item.price <= priceData.high
      );
      dispatch(setCategory(newCategoryItems));
    }
  };

  if (sortOption === 'popularity') {
    const newArr = JSON.parse(JSON.stringify(categoryItems));
    const newCatalog = newArr.sort((a, b) => a.order_count - b.order_count);
    dispatch(setCategory(newCatalog));
    setSortOption('');
    setDropdawnLabel('По популярности');
  } else if (sortOption === 'priceLow') {
    const newArr = JSON.parse(JSON.stringify(categoryItems));
    const newCatalog = newArr.sort((a, b) => a.price - b.price);
    dispatch(setCategory(newCatalog));
    setSortOption('');
    setDropdawnLabel('По цене (сначала дешевле)');
  } else if (sortOption === 'priceHigh') {
    const newArr = JSON.parse(JSON.stringify(categoryItems));
    const newCatalog = newArr.sort((a, b) => b.price - a.price);
    dispatch(setCategory(newCatalog));
    setSortOption('');
    setDropdawnLabel('По цене (сначала дороже)');
  } else if (sortOption === 'nameAsc') {
    const newArr = JSON.parse(JSON.stringify(categoryItems));
    const newCatalog = newArr.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    console.log(newCatalog);
    dispatch(setCategory(newCatalog));
    setSortOption('');
    setDropdawnLabel('По названию (A-Я)');
  } else if (sortOption === 'nameDesc') {
    const newArr = JSON.parse(JSON.stringify(categoryItems));
    const newCatalog = newArr.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    dispatch(setCategory(newCatalog));
    setSortOption('');
    setDropdawnLabel('По названию (Я-А)');
  }

  if (isLoading) {
    return (
      <div className="mt-[30px] flex flex-col text-center">
        <h1 className="text-center text-2xl font-semibold leading-7 text-gray-900">
          {categoryItems && categoryItems[0].category}
        </h1>
        <div className="mt-10">
          Цена от
          <input
            onChange={changeHandler}
            value={priceData?.low}
            name="low"
            type="number"
            className="border rounded border-black"
          />
          до
          <input
            onChange={changeHandler}
            value={priceData?.high}
            name="high"
            type="number"
            min="1"
            className="border rounded border-black"
          />
          <button
            onClick={submitHandler}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Применить
          </button>
          <Dropdown color="light" label={dropdawnLabel}>
            <Dropdown.Item onClick={() => setSortOption('popularity')}>
              По популярности
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption('priceLow')}>
              По цене (сначала дешевле)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption('priceHigh')}>
              По цене (сначала дороже)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption('nameAsc')}>
              По названию (А-Я)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption('nameDesc')}>
              По названию (Я-А)
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className=" mx-auto max-w-screen-xl mt-10 grid  group bg-white shadow-xl shadow-neutral-100 border ">
          <ul role="list" className="divide-y divide-gray-100">
            {categoryItems &&
              categoryItems.map((item) => 
                <CategoryItem el={item} key={item.id} />
              )}
          </ul>
        </div>
      </div>
    );
  }
};
