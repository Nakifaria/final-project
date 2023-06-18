import { toast } from "react-toastify";
import { ThunkActionCreater } from "../Types/thunk.type";
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
