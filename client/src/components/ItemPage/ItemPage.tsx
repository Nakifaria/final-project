import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setItem } from '../../redux/slices/catalogSlice';
import { RootState } from '../../redux/store/store';
import { useParams } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { SVGComponent } from '../Svg/svgComponent';

export const ItemPage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {prodId} = useParams()

  const categoryData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/catalog/category/product/${prodId}`
      );
      const itemData = await response.json();
      // console.log(categoryData);
      dispatch(setItem(itemData));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    categoryData();
  }, []);

  const item = useAppSelector((state: RootState) => state.catalog.item);
  if (isLoading) {
    const description = item.description;
    const result = Object.entries(description);
    //   console.log(result);

    return (
      <div className="mt-10 flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/5">
          <img src="https://cdn1.ozone.ru/s3/multimedia-2/6368709194.jpg" />
        </div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize ">
              {item.name}
            </h1>

            <div className="mt-4 text-gray-500 ">
              <ul>
                {result.map((el, i) => (
                  <li key={i}>
                    {el[0]}: {el[1]}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h1 className="text-black-500 ">Цена: {item.price} ₽</h1>

              <div className="mt-3 md:flex md:items-center md:-mx-2">
              <button type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
              <SVGComponent svgName="cart"/>
                В корзину
               </button>

               <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
               <SVGComponent svgName="favourite"/>
                В избранное
                </button>

                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <SVGComponent svgName="sravnenie"/>
                В сравнение
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
