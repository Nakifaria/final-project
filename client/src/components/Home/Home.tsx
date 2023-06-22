import { FilteredItemsBox } from "./FilteredItemsBox";

export const Home = () => {
  return (
    <div className="flex flex-col py-10 px-4 gap-44 shadow-xl shadow-neutral-300">
      <FilteredItemsBox
        title="Хиты продаж"
        btnName="Все Хиты"
        sortBy={"order_count"}
        catNumber={99}
      />

      <FilteredItemsBox
        title="Новинки"
        btnName="Все новинки"
        sortBy={"createdAt"}
        catNumber={99}
      />
    </div>
  );
};
