import { FC, useEffect, useState } from 'react';
import { CatButton } from './CatButton';
import { ItemCard } from './itemCard';
import { ICategory, IItem } from '../../redux/slices/items.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

export interface IPropsBox {
  title: string;
  btnName: string;
  sortBy: 'order_count' | 'createdAt';
  catNumber: number;
}

export const FilteredItemsBox: FC<IPropsBox> = ({
  title,
  btnName,
  sortBy,
  catNumber,
}) => {
  const aboutItems = useSelector((state: RootState) => state.itemsSlice.items);

  const allItems = aboutItems
    .map((el) => el.Items)
    .flat()
    .sort((a, b) => {
      if (sortBy === 'order_count') {
        return b.order_count - a.order_count;
      } else if (sortBy === 'createdAt') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    });

  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    setItems(allItems.slice(0, 6));
  }, []);

  const otherCategory = (cat: number) => {
    if (cat === 99 || cat === 55) {
      console.log('do sorta', items);

      setItems(allItems.slice(0, 6));
    } else {
      setItems(allItems.filter((el) => el.category_id === cat).slice(0, 6));
    }
  };
  return (
    <div>
      <span className="text-2xl mb-4">{title}</span>
      <div className="category-box flex border-b border-gray-400 justify-between overflow-y-auto mb-4">
        <div className="flex gap-4 me-4">
          <CatButton
            title={'Все категории'}
            autofocus={true}
            otherCategory={otherCategory}
            catNumber={catNumber}
          />
          {aboutItems &&
            aboutItems
              .slice(0, 6)
              .map((el) => (
                <CatButton
                  title={el.title}
                  autofocus={false}
                  key={el.id}
                  otherCategory={otherCategory}
                  catNumber={el.id}
                />
              ))}
        </div>
        <button className="text-sm py-4 border-b border-white text-red-500 focus:outline-none whitespace-nowrap">
          {btnName}
        </button>
      </div>
      <div className="card-box flex gap-2 overflow-y-auto">
        {items && items.map((el) => <ItemCard item={el} key={el.id} />)}
      </div>
    </div>
  );
};
