import { FC } from 'react';
import { ICategory, IItem } from '../../redux/slices/items.slice';
import { ReactSVG } from 'react-svg';

export interface ICard {
  item: IItem;
}

export const ItemCard: FC<ICard> = ({ item }) => {
  return (
    <div className="w-1/6 overflow-y-auto">
      <header className="cursor-pointer">
        <img
          src="https://cdn1.ozone.ru/s3/multimedia-2/6368709194.jpg"
          alt="img-item"
        />
      </header>
      <main>
        <div className="flex flex-col gap-2">
          <span className="text-xs text-center cursor-pointer hover:text-red-500 h-10">
            {item.name}
          </span>
          <div className="flex border border-black rounded-lg">
            <button className="w-1/2 px-2 py-2 border-r border-black flex justify-center hover:text-white hover:bg-black">
              <ReactSVG src="sravnenie.svg" className="w-6" />
            </button>
            <button className="w-1/2 px-2 py-2 flex justify-center hover:text-white hover:bg-black">
              <ReactSVG src="favourite.svg" className="w-6" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
