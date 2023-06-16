import { FC } from 'react';

export interface IbuttonProps {
  title: string;

  otherCategory: (cat: number) => void;
  catNumber: number;
}

export const CatButton: FC<IbuttonProps> = ({
  title,
  otherCategory,
  catNumber,
}) => {
  return (
    <button className="catBtn" onClick={() => otherCategory(catNumber)}>
      {title}
    </button>
  );
};
