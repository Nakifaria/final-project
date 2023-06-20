import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { Empty } from '../Empty/Empty';
import { ItemCard } from '../Home/itemCard';

export const Favourite = () => {
  const favIds = useSelector(
    (state: RootState) => state.PackItemsSlice.favourite
  );

  const favItems = useSelector((state: RootState) => state.itemsSlice.items)
    .map((el) => el.Items)
    .flat()
    .filter((el) => favIds.includes(el.id));

  return (
    <div className="flex flex-col py-10 px-4">
      {favItems.length === 0 && <Empty title="избранном" />}

      {favItems.length > 0 && (
        <>
          <span className="text-2xl mb-4 border-b border-gray-400 pb-10">
            Избранное
          </span>
          <div className="flex justify-center gap-4 flex-wrap">
            {favItems &&
              favItems.map((el) => <ItemCard item={el} key={el.id} />)}
          </div>
        </>
      )}
    </div>
  );
};
