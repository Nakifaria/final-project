import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store/store';

import { CatButton } from './CatButton';
import { ItemCard } from './itemCard';
import { useEffect, useState } from 'react';
import { IItem } from '../../redux/slices/items.slice';

export const Home = () => {
  const aboutItems = useSelector((state: RootState) => state.itemsSlice.items);

  const allItems = aboutItems
    .map((el) => el.Items)
    .flat()
    .sort((a, b) => b.order_count - a.order_count);

  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    setItems(allItems.slice(0, 6));
  }, []);

  const otherCategory = (cat: number) => {
    if (cat !== 99) {
      setItems(allItems.filter((el) => el.category_id === cat).slice(0, 6));
    } else {
      setItems(allItems.slice(0, 6));
    }
  };

  return (
    <div className="flex flex-col py-10 px-4">
      <span className="text-2xl mb-4">Хиты продаж</span>
      <div className="category-box flex border-b border-gray-400 justify-between overflow-y-auto mb-4">
        <div className="flex gap-4 me-4">
          <CatButton
            title={'Все категории'}
            autofocus={true}
            otherCategory={otherCategory}
            catNumber={99}
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
          Все хиты
        </button>
      </div>
      <div className="card-box flex gap-2">
        {items && items.map((el) => <ItemCard item={el} />)}
      </div>
    </div>
  );
};
