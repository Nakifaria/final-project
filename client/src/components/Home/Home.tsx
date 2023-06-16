import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store/store';
import { Modal } from '../Modal/Modal';

import PacmanLoader from 'react-spinners/PacmanLoader';
import { CatButton } from './CatButton';

export const Home = () => {
  const categories = useSelector((state: RootState) => state.itemsSlice.items);

  return (
    <div className="flex flex-col py-10 px-4">
      <span className="text-2xl mb-4">Хиты продаж</span>
      <div className="flex border-b border-gray-400 justify-between overflow-y-auto scroll-type">
        <div className="flex gap-4 me-4">
          <CatButton title={'Все категории'} autofocus={true} />
          {categories &&
            categories
              .slice(0, 6)
              .map((el) => <CatButton title={el.title} autofocus={false} />)}
        </div>
        <button className="text-sm py-4 border-b border-white text-red-500 focus:outline-none whitespace-nowrap">
          Все хиты
        </button>
      </div>
    </div>
  );
};
