import { RootState } from '../../redux/store/store';
import { CatButton } from '../Home/CatButton';
import { useState } from 'react';
import { IItem } from '../../redux/slices/items.slice';
import { ItemCard } from '../Home/itemCard';
import { Empty } from '../Empty/Empty';
import { useAppSelector } from '../../redux/hook';

export const Compare = () => {
  const idsToCompare = useAppSelector(
    (state: RootState) => state.PackItemsSlice.compare
  );

  const itemsToCompare = useAppSelector(
    (state: RootState) => state.itemsSlice.items
  )
    .map((el) => el.Items)
    .flat()
    .filter((el) => idsToCompare.includes(el.id));

  const categoriesToCompare = useAppSelector(
    (state: RootState) => state.itemsSlice.items
  )
    .map((el) => {
      return { id: el.id, title: el.title };
    })
    .filter((el) => itemsToCompare.map((el) => el.category_id).includes(el.id))
    .sort((a, b) => a.id - b.id);

  const [currentCategory, setCurrentCategory] = useState<number>(
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
            {currentItems.length &&
              currentItems.map((itemEl) => (
                <div key={itemEl.id} className="items-info flex flex-col">
                  <ItemCard item={itemEl} />
                  <div className="gap-4 mt-5 max-w-[200px]">
                    {Object.entries(itemEl.description).map(
                      (el, index, array) => {
                        if (el.includes('Dimensions')) {
                          const dimensions = Object.entries(el[1]);
                          const newEl = dimensions
                            .map((item) => item.join(': '))
                            .join(' ');
                          el[1] = newEl;
                        }
                        return (
                          <div
                            className={`${
                              index !== array.length - 1 &&
                              'border-b border-gray-400'
                            } py-4`}
                          >
                            <div className="flex flex-col">
                              <span className="text-gray-400">
                                {`${el[0]}: `}
                              </span>
                              <span
                                content={el[1]}
                                className={`${
                                  el[1].length > 20 &&
                                  'cursor-pointer relative hover:after:absolute hover:after:-top-10 hover:after:left-0 hover:after:min-w-[200px] hover:after:min-h-[60px] hover:after:border hover:after:rounded-md hover:after:border-black hover:after:bg-white hover:after:text-black hover:after:text-center hover:after:p-2 hover:after:content-between hover:after:content-[attr(content)] hover:after:z-10'
                                }`}
                              >
                                {el[1].length > 20
                                  ? `${el[1].slice(0, 20)}...`
                                  : el[1]}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
