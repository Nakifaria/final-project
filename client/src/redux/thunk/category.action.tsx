import { toast } from "react-toastify";
import { ThunkActionCreater } from "../Types/thunk.type";
import { startLoad } from "../slices/loader.slice";
import { setCategory } from "../slices/catalogSlice";

export const categoryFetch = (testId, setIsLoading) => async (dispatch) => {
  console.log("Я САНК!");

  const response = await fetch(
    `http://localhost:3000/catalog/category/${testId}`
  );

  const categoryData = await response.json();
  dispatch(setCategory(categoryData));
  setIsLoading(true);
};
