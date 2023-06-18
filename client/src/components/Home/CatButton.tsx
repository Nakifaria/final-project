import { Dispatch, FC, useEffect, useRef } from 'react';

export interface IbuttonProps {
  title: string;
  otherCategory: (cat: number) => void;
  catNumber: number;
  currentCategory: number;
  setCurrentCategory: Dispatch<React.SetStateAction<number>>;
}

export const CatButton: FC<IbuttonProps> = ({
  title,
  otherCategory,
  catNumber,
  currentCategory,
  setCurrentCategory,
}) => {
  const currBtn = useRef<HTMLButtonElement>(null);

  const changeCategory = () => {
    otherCategory(catNumber);
    setCurrentCategory(catNumber);
  };

  useEffect(() => {
    if (catNumber === currentCategory) {
      currBtn.current?.classList.remove('catBtn');
      currBtn.current?.classList.add('currentCatBtn');
    } else {
      currBtn.current?.classList.add('catBtn');
      currBtn.current?.classList.remove('currentCatBtn');
    }
  }, [currentCategory, catNumber]);

  return (
    <button ref={currBtn} onClick={changeCategory}>
      {title}
    </button>
  );
};
