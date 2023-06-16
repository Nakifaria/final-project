import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store/store';

import { CatButton } from './CatButton';
import { ItemCard } from './itemCard';
import { useEffect, useState } from 'react';
import { IItem } from '../../redux/slices/items.slice';
import { FilteredItemsBox } from './FilteredItemsBox';

export const Home = () => {
  return (
    <div className="flex flex-col py-10 px-4 gap-44">
      <FilteredItemsBox
        title="Хиты продаж"
        btnName="Все Хиты"
        sortBy={'order_count'}
        catNumber={99}
      />

      <FilteredItemsBox
        title="Новинки"
        btnName="Все новинки"
        sortBy={'createdAt'}
        catNumber={55}
      />
    </div>
  );
};
