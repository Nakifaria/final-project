export const FavouriteItem = ({ id, src, price, name }) => {
    return (
        <div className="flex-col">
            {name}<img src={src} />{price}
            <div className="flex align-bottom">
            <button className=" max-h-10 flex shadow w-32 block border-blue-600 border-2 rounded-full focus:outline-none focus:border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white">В корзину</button>
            <button className=" max-h-10 flex shadow w-32 block border-blue-600 border-2 rounded-full focus:outline-none focus:border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-600 hover:text-white">Сравнить</button>
            <img src="https://s1.iconbird.com/ico/2013/9/452/w448h5121380477116trash.png" className="w-10 max-w-xs max-h-10" ></img>
            </div>
            <hr />
        </div>
    )
}