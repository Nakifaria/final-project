import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hook";

export const ConfigurationPage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { configurationId } = useParams();
  const configurationData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/configurator/${configurationId}`
      );
      const itemData = await response.json();
      dispatch(setItem(itemData));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    configurationData();
  });

  if (isLoading) {
    return (
      <div className="mt-10 flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/5">
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
