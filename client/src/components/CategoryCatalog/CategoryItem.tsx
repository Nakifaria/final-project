import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { ItemButton } from "../Home/ItemButton";
import { SVGComponent } from "../Svg/SVGComponent";
import { RootState } from "../../redux/store/store";
import { addToAction, removeFromAction } from "../../redux/thunk/items.action";

export const CategoryItem = ({el}) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state: RootState) => state.userSlice.isAuth);
  

  const changePackFn = (packName, action: 'remove' | 'add') => {
    if (action === 'add') {
      dispatch(addToAction({ id: el.id, isAuth, packName }));
    } else if (action === 'remove') {
      dispatch(removeFromAction({ id: el.id, isAuth, packName }));
    }
  };
  
    return (
    <li key={el.id} className="w-full flex justify-between py-5">
    <div
      onClick={() => navigate(`/product/${el.id}`)}
      className=" grow flex justify-between gap-x-6"
    >
      <div className="ml-5 w-1/6 flex-shrink-0">
        <img
          className="w-8 h-8"
          src={el.img}
          alt="Neil image"
        />
      </div>
      <div className="grow flex justify-left gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm text-center font-bold leading-6 text-gray-900">
            {el.name}
          </p>
        </div>
      </div>
      <div className="mr-10 w-1/6 ml-10 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm text-center leading-6 text-gray-900">
          {el.price} ₽
        </p>
      </div>
    </div>
    <div className="mr-5 w-1/4 sm:flex sm:items-end">
    <ItemButton
  packName="cart"
  changePackFn={changePackFn}
  addedBtnName="addedToBtnFromItem"
  btnName="btnInItems"
  itemId={el.id}
>
  <SVGComponent svgName="cart" />
</ItemButton>

<ItemButton
  packName="favourite"
  changePackFn={changePackFn}
  addedBtnName="addedToBtnFromItem"
  btnName="btnInItems"
  itemId={el.id}
>
  <SVGComponent svgName="favourite"/>
</ItemButton>

<ItemButton
  packName="compare"
  changePackFn={changePackFn}
  addedBtnName="addedToBtnFromItem"
  btnName="btnInItems"
  itemId={el.id}
>
  <SVGComponent svgName="compare"/>
</ItemButton>
    </div>
  </li>
    )
}