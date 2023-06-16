import { FC } from 'react';

export interface IbuttonProps {
  title: string;
  autofocus: boolean;
  otherCategory: (cat: number) => void;
  catNumber: number;
}

export const CatButton: FC<IbuttonProps> = ({
  title,
  autofocus,
  otherCategory,
  catNumber,
}) => {
  return (
    <>
      {autofocus ? (
        <button
          className="catBtn"
          autoFocus
          onClick={() => otherCategory(catNumber)}
        >
          {title}
        </button>
      ) : (
        <button className="catBtn" onClick={() => otherCategory(catNumber)}>
          {title}
        </button>
      )}
    </>
  );
};
