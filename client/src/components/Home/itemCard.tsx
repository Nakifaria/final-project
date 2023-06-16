import { FC } from 'react';
import { ICategory, IItem } from '../../redux/slices/items.slice';
import { ReactSVG } from 'react-svg';
import { SVGComponent } from '../Svg/SVGComponent';

export interface ICard {
  item: IItem;
}

export const ItemCard: FC<ICard> = ({ item }) => {
  return (
    <div className="min-w-[200px]">
      <header className="cursor-pointer">
        <img
          src="https://cdn1.ozone.ru/s3/multimedia-2/6368709194.jpg"
          alt="img-item"
        />
      </header>
      <main>
        <div className="flex flex-col gap-2">
          <span className="text-xs text-center cursor-pointer hover:text-red-500 h-8 ">
            {item.name}
          </span>
          <span className="text-lg text-center ">{item.price} ₽</span>
          <div className="flex flex-col">
            <div className="flex border border-black rounded-t-lg">
              <button className="w-1/2 px-2 py-2 border-r border-black flex justify-center hover:text-white hover:bg-black ">
                <SVGComponent svgName="sravnenie" />
              </button>
              <button className="w-1/2 px-2 py-2 flex justify-center hover:text-white hover:bg-black ">
                <SVGComponent svgName="favourite" />
              </button>
            </div>
            <div className="flex border border-black border-t-0 rounded-b-lg">
              <button className="w-full px-2 py-2 flex justify-center hover:text-white hover:bg-black ">
                <SVGComponent svgName="cart" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
