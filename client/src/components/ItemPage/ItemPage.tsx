import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { setItem } from "../../redux/slices/catalogSlice"
import { RootState } from "../../redux/store/store"


export const ItemPage = () => {

    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const categoryData = async () => {
        try {
            const response = await fetch('http://localhost:3001/catalog/category/product/27')
            const itemData = await response.json()
            // console.log(categoryData);
            dispatch(setItem(itemData))
            
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(true)
          }
    }

    useEffect(() => {
        categoryData()
    
      }, [])

      const item = useAppSelector((state: RootState) => state.catalog.item)
      if(isLoading){
      const description = item.description
      const result = Object.entries(description)
    //   console.log(result);
      

    return (
        <div className="mt-10 flex justify-center min-h-screen">

            

        <div className="hidden bg-cover lg:block lg:w-2/5">
            <img src="https://cdn1.ozone.ru/s3/multimedia-2/6368709194.jpg"/>
        </div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
                <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                    {item.name}
                </h1>

                <p className="mt-4 text-gray-500 dark:text-gray-400">
                    <ul>
                    { result.map((el) => (<li>{el[0]}: {el[1]}</li>))}
                    </ul>
                </p>

                <div className="mt-6">
                    <h1 className="text-black-500 dark:text-gray-300">Цена: {item.price} ₽</h1>

                    <div className="mt-3 md:flex md:items-center md:-mx-2">
                        <button className="flex justify-center w-full px-6 py-3 text-white bg-blue-500 rounded-md md:w-auto md:mx-2 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>

                            <span className="mx-2">
                            В корзину
                            </span>
                        </button>

                        <button className="flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>

                            <span className="mx-2">
                                В избранное
                            </span>
                        </button>

                        <button className="flex justify-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>

                            <span className="mx-2">
                                В сравнение
                            </span>
                        </button>

                    </div>
                </div>

                
            </div>
        </div>
    </div>
        // <div>
        //     <h1>Название Товара</h1>
        //     <div>
        //         <div>
        //             <img></img>
        //         </div>
        //         <div>
        //             <p>Описание товара</p>
        //             <p>Цена товара</p>                  
        //             <a>Сравнить</a>
        //             <a>Лайк!</a>
        //             <a>В Корзину</a>
        //         </div>
        //     </div>
        //     <div>
        //         <h2>Характеристики</h2>
        //         <p>Описание</p>
        //     </div>
        // </div>
    )
}}