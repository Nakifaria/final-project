import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setCategory } from '../../redux/slices/catalogSlice';
import { RootState } from '../../redux/store/store';
import { ReactSVG } from 'react-svg';
import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown } from 'flowbite-react';

export const CategoryCatalog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lowPrice, setLowPrice] = useState('');
  const [highPrice, setHighPrice] = useState('');

  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const {catId} = useParams()  

  const categoryData = async () => {
    try {

      const response = await fetch(`http://localhost:3000/catalog/category/${catId}`);

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
    (state: RootState) => state.catalog.category)
    console.log(categoryItems);


    


    if (isLoading) {
  return (
    <div className="mt-[30px] flex flex-col text-center">
      <h1 className="text-center text-2xl font-semibold leading-7 text-gray-900">
         {categoryItems && categoryItems[0].category}
      </h1>
<div className="mt-10">
   Цена от
   <input onChange={(e) => setLowPrice(e.target.value)}
            value={lowPrice}
            name="low"
            type="text"
            className="border rounded border-black"/> 
   до
    <input onChange={(e) => setHighPrice(e.target.value)}
            value={highPrice}
            name="high"
            type="text"
            className="border rounded border-black"/>
<Dropdown color="light"
      label="Dropdown button"
    >
      <Dropdown.Item>
        Dashboard
      </Dropdown.Item>
      <Dropdown.Item>
        Settings
      </Dropdown.Item>
      <Dropdown.Item>
        Earnings
      </Dropdown.Item>
      <Dropdown.Item>
        Sign out
      </Dropdown.Item>
    </Dropdown>
</div>
      <div className=" mx-auto max-w-screen-xl mt-10 grid  group bg-white shadow-xl shadow-neutral-100 border ">
        <ul role="list" className="divide-y divide-gray-100">
          {categoryItems &&
            categoryItems.map((el) => (
              <li  key={el.id} className="flex justify-between gap-x-6 py-5">
                <div onClick={() => navigate(`/product/${el.id}`)} className="flex justify-between gap-x-6">
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
                  <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <ReactSVG src="sravnenie.svg" className="w-6" />
                    </button>
                  <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <ReactSVG src="favourite.svg" className="w-6" />
                    </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}};
