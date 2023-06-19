export const FavouriteItem = ({ id, source, price, name, handlerDelete, addItem, compareItem }) => {
    return (
        <>
        <div className="flex">
            <div>
            {name}<img src={source} className="w-80 h-60" />
            </div>
            <div className="flex items-end space-x-2 justify-items-end">
             <span>Цена {price} р.</span>
            <button onClick={() => addItem(id)} className=" max-h-10 shadow w-32 block border-blue-600 border-2 rounded-md focus:border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white">В корзину</button>
            <button onClick={() => compareItem(id)} className=" max-h-10 shadow w-32 block border-blue-600 border-2 rounded-md focus:outline-none focus:border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white">Сравнить</button>
            <img src="https://s1.iconbird.com/ico/2013/9/452/w448h5121380477116trash.png" className="w-10 max-w-xs max-h-10" onClick={() => handlerDelete(id)}></img>
            </div>
        </div>
        <hr  className=""/>
        </>
    )
}