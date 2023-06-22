import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setItem } from "../../redux/slices/catalogSlice";
import { RootState } from "../../redux/store/store";
import { useParams } from "react-router-dom";
import { SVGComponent } from "../Svg/SVGComponent";
import { addToAction, removeFromAction } from "../../redux/thunk/items.action";
import { ItemButton } from "../Home/ItemButton";

export const ItemPage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { prodId } = useParams();

  const categoryData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/catalog/category/product/${prodId}`
      );
      const itemData = await response.json();
      // console.log(categoryData);
      dispatch(setItem(itemData));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    categoryData();
  }, []);

  const item = useAppSelector((state: RootState) => state.catalog.item);
  const isAuth = useAppSelector((state: RootState) => state.userSlice.isAuth);

  const cartId = useAppSelector((state: RootState) => state.userSlice.cartId);

  const userId = useAppSelector((state: RootState) => state.userSlice.id);

  const changePackFn = (packName, action: "remove" | "add") => {
    if (action === "add") {
      dispatch(addToAction({ id: item.id, isAuth, packName, cartId, userId }));
    } else if (action === "remove") {
      dispatch(
        removeFromAction({ id: item.id, isAuth, packName, cartId, userId })
      );
    }
  };

  if (isLoading) {
    const description = item.description;
    const result = Object.entries(description);
    result.map((el) => {
      if (el.includes("Dimensions")) {
        const dimensions = Object.entries(el[1]);
        const newEl = dimensions.map((item) => item.join(": ")).join(" ");
        el[1] = newEl;
      }
    });

    return (
      <div className="mt-10 flex justify-center min-h-screen bg-white shadow-xl shadow-neutral-300">
        <div className="hidden bg-cover lg:block lg:w-2/5 self-center">
          <img src={item.img} />
        </div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize ">
              {item.name}
            </h1>

            <div className="mt-4 text-gray-500 ">
              <ul>
                {result.map((el, i) => (
                  <li key={i}>
                    {el[0]}: {el[1]}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h1 className="text-black-500 ">Цена: {item.price} ₽</h1>

              <div className="mt-3 md:flex md:items-center md:-mx-2">
                <ItemButton
                  packName="cart"
                  changePackFn={changePackFn}
                  addedBtnName="addedToBtnFromItem"
                  btnName="btnInItems"
                  itemId={item.id}
                >
                  <SVGComponent svgName="cart" />
                </ItemButton>

                <ItemButton
                  packName="favourite"
                  changePackFn={changePackFn}
                  addedBtnName="addedToBtnFromItem"
                  btnName="btnInItems"
                  itemId={item.id}
                >
                  <SVGComponent svgName="favourite" />
                </ItemButton>

                <ItemButton
                  packName="compare"
                  changePackFn={changePackFn}
                  addedBtnName="addedToBtnFromItem"
                  btnName="btnInItems"
                  itemId={item.id}
                >
                  <SVGComponent svgName="compare" />
                </ItemButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
