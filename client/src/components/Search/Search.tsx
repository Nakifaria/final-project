import { useQuery } from '../../hooks/useQuery';
import { useAppSelector } from '../../redux/hook';
import { RootState } from '../../redux/store/store';
import { Empty } from '../Empty/Empty';
import { ItemCard } from '../Home/itemCard';

export const Search = () => {
  const query = useQuery();

  const searchValue = query.get('q');

  const itemsBySearch = useAppSelector(
    (state: RootState) => state.itemsSlice.items
  )
    .map((el) => el.Items)
    .flat()
    .filter((el) => {
      if (searchValue) {
        return el.name.toLocaleLowerCase().includes(searchValue.toLowerCase());
      }

      return false;
    });

  console.log(itemsBySearch);

  return (
    <div className="flex flex-col py-10 px-4">
      {itemsBySearch.length === 0 && <Empty />}

      {itemsBySearch.length > 0 && (
        <>
          <span className="text-2xl mb-4 border-b border-gray-400 pb-10">
            Поиск
          </span>
          <div className="flex justify-center gap-4 flex-wrap">
            {itemsBySearch &&
              itemsBySearch.map((el) => <ItemCard item={el} key={el.id} />)}
          </div>
        </>
      )}
    </div>
  );
};
