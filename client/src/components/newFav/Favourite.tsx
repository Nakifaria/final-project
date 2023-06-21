import { RootState } from '../../redux/store/store';
import { Empty } from '../Empty/Empty';
import { ItemCard } from '../Home/itemCard';
import { useAppSelector } from '../../redux/hook';

export const Favourite = () => {
  const favIds = useAppSelector(
    (state: RootState) => state.PackItemsSlice.favourite
  );

  const favItems = useAppSelector((state: RootState) => state.itemsSlice.items)
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
          <div className="flex gap-4 justify-center flex-wrap">
            {favItems &&
              favItems.map((el) => <ItemCard item={el} key={el.id} />)}
          </div>
        </>
      )}
    </div>
  );
};
