import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { CatButton } from '../Home/CatButton';
import { useEffect, useState } from 'react';
import { IItem } from '../../redux/slices/items.slice';
import { ItemCard } from '../Home/itemCard';
import { useNavigate } from 'react-router';
import { Empty } from '../Empty/Empty';

export const Compare = () => {
  const idsToCompare = useSelector(
    (state: RootState) => state.PackItemsSlice.compare
  );

  const itemsToCompare = useSelector(
    (state: RootState) => state.itemsSlice.items
  )
    .map((el) => el.Items)
    .flat()
    .filter((el) => idsToCompare.includes(el.id));

  const categoriesToCompare = useSelector(
    (state: RootState) => state.itemsSlice.items
  )
    .map((el) => {
      return { id: el.id, title: el.title };
    })
    .filter((el) => itemsToCompare.map((el) => el.category_id).includes(el.id))
    .sort((a, b) => a.id - b.id);

  const itemsDescription = itemsToCompare.map((el) => el.description);

  const [currentCategory, setCurrentCategory] = useState(
    categoriesToCompare[0]?.id
  );

  const [currentItems, setCurrentItems] = useState<IItem[]>(
    itemsToCompare.filter((el) => el.category_id === currentCategory)
  );

  const changeCategory = (categoryId: number) => {
    setCurrentItems(
      itemsToCompare.filter((el) => el.category_id === categoryId)
    );
  };

  return (
    <div className="flex flex-col py-10 px-4">
      {itemsToCompare.length === 0 && <Empty title="сравнении" />}

      {itemsToCompare.length > 0 && (
        <>
          <span className="text-2xl mb-4">Сравнение</span>
          <div className="category-box flex border-b border-gray-400 justify-between overflow-y-scroll mb-4">
            <div className="flex gap-4 me-4">
              {categoriesToCompare &&
                categoriesToCompare.map((el) => (
                  <CatButton
                    title={el.title}
                    key={el.id}
                    catNumber={el.id}
                    otherCategory={changeCategory}
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                  />
                ))}
            </div>
          </div>
          <div className="card-box flex gap-2 overflow-y-scroll">
            {currentItems &&
              currentItems.map((el) => <ItemCard item={el} key={el.id} />)}
          </div>
          <div className="flex gap-2"></div>
        </>
      )}
    </div>
  );
};
