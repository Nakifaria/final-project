import { FC, useEffect, useState } from 'react';
import { CatButton } from './CatButton';
import { ItemCard } from './itemCard';
import { IItem } from '../../redux/slices/items.slice';
import { RootState } from '../../redux/store/store';
import { useAppSelector } from '../../redux/hook';

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
  const aboutItems = useAppSelector(
    (state: RootState) => state.itemsSlice.items
  );

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

  const [currentCategory, setCurrentCategory] = useState(99);

  useEffect(() => {
    setItems(allItems.slice(0, 6));
  }, []);

  const otherCategory = (cat: number) => {
    if (cat === 99) {
      setItems(allItems.slice(0, 6));
    } else {
      setItems(allItems.filter((el) => el.category_id === cat).slice(0, 6));
    }
  };
  return (
    <div>
      <span className="text-2xl mb-4">{title}</span>
      <div className="category-box flex border-b border-gray-400 justify-between overflow-y-scroll mb-4">
        <div className="flex gap-4 me-4">
          <CatButton
            title={'Все категории'}
            otherCategory={otherCategory}
            catNumber={catNumber}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />
          {aboutItems &&
            aboutItems
              .slice(0, 6)
              .map((el) => (
                <CatButton
                  title={el.title}
                  key={el.id}
                  otherCategory={otherCategory}
                  catNumber={el.id}
                  currentCategory={currentCategory}
                  setCurrentCategory={setCurrentCategory}
                />
              ))}
        </div>
        <button className="text-sm py-4 border-b border-white text-red-500 focus:outline-none whitespace-nowrap">
          {btnName}
        </button>
      </div>
      <div className="card-box flex gap-x-16 md:gap-x-12 lg:gap-x-2 flex-wrap">
        {items && items.map((el) => <ItemCard item={el} key={el.id} />)}
      </div>
    </div>
  );
};
