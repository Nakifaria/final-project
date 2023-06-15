import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { setCategory } from "../../redux/slices/catalogSlice"
import { RootState } from "../../redux/store/store"

export const CategoryCatalog = () => {

    const dispatch = useAppDispatch()

    const categoryData = async () => {
        try {
            const response = await fetch('http://localhost:3001/catalog/category/1')
            const categoryData = await response.json()
            // console.log(categoryData);
            dispatch(setCategory(categoryData))
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        categoryData()
      }, [])

      const categoryItems = useAppSelector((state: RootState) => state.catalog.category)
    //   console.log(categoryItems);

    return (
        <div className="mt-[30px] flex flex-col text-center">
            <h1 className='text-center text-2xl font-semibold leading-7 text-gray-900'>Категория</h1>
            <div>
                <a>Фильтр</a>
            </div>
            <div className=" mx-auto max-w-screen-xl mt-10 grid  group bg-white shadow-xl shadow-neutral-100 border ">

            <ul role="list" className="divide-y divide-gray-100">
            {categoryItems && categoryItems.map((el) => (
            <li key={el.id} className="flex justify-center gap-x-6 py-5">
            <div className="flex-shrink-0">
            <img className="w-8 h-8" src="https://cdn1.ozone.ru/s3/multimedia-2/6368709194.jpg" alt="Neil image"/>
            </div>
            <div className="flex gap-x-4">
             <div className="min-w-0 flex-auto">
              <p className="text-sm text-center font-bold leading-6 text-gray-900">{el.name}</p>
            </div>
          </div>
          <div className="sm:flex sm:flex-col sm:items-end">
             <p className="text-sm text-center leading-6 text-gray-900">{el.price}  ₽</p>
             </div>
             <div className="sm:flex sm:items-end">
             <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Корзина</button>
             <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Сравнить</button>
             <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Избранное</button>
          </div>
          </li> 
        ))}
          </ul>
            </div>
        </div>
    )
}