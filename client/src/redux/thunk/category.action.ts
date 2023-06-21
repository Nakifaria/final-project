import { toast } from "react-toastify";

import { setCategory } from "../slices/catalogSlice";
import { startLoad } from "../slices/loader.slice";


export const categoryFetch = (categoryId, setIsLoading) => async (dispatch) => {
  try {
    console.log("Я САНК!");

    const response = await fetch(
      `http://localhost:3000/catalog/category/${categoryId}`
    );
    const categoryData = await response.json();
    dispatch(setCategory(categoryData));
    setIsLoading(true);
  } catch (error) {
    toast.error("Непредусмотренная ошибка", { autoClose: 2000 });
    console.log(error);
    dispatch(startLoad(false));
  }
};

export const sortThunk = (sortOption, setSortOption, setDropdawnLabel, categoryItems) => (dispatch) => {
  if (sortOption === 'popularity') {
    const newArr = JSON.parse(JSON.stringify(categoryItems));
    const newCatalog = newArr.sort((a, b) => a.order_count - b.order_count);
    dispatch(setCategory(newCatalog));
    setSortOption('');
    setDropdawnLabel('По популярности');
  } else if (sortOption === 'priceLow') {
    const newArr = JSON.parse(JSON.stringify(categoryItems));
    const newCatalog = newArr.sort((a, b) => a.price - b.price);
    dispatch(setCategory(newCatalog));
    setSortOption('');
    setDropdawnLabel('По цене (сначала дешевле)');
  } else if (sortOption === 'priceHigh') {
    const newArr = JSON.parse(JSON.stringify(categoryItems));
    const newCatalog = newArr.sort((a, b) => b.price - a.price);
    dispatch(setCategory(newCatalog));
    setSortOption('');
    setDropdawnLabel('По цене (сначала дороже)');
  } else if (sortOption === 'nameAsc') {
    const newArr = JSON.parse(JSON.stringify(categoryItems));
    const newCatalog = newArr.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    console.log(newCatalog);
    dispatch(setCategory(newCatalog));
    setSortOption('');
    setDropdawnLabel('По названию (A-Я)');
  } else if (sortOption === 'nameDesc') {
    const newArr = JSON.parse(JSON.stringify(categoryItems));
    const newCatalog = newArr.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    dispatch(setCategory(newCatalog));
    setSortOption('');
    setDropdawnLabel('По названию (Я-А)');
  }
}