import { FC, MouseEvent } from 'react';

export interface IbuttonProps {
  title: string;
  autofocus: boolean;
}

export const CatButton: FC<IbuttonProps> = ({ title, autofocus }) => {
  return (
    <>
      {autofocus ? (
        <button className="catBtn" autoFocus>
          {title}
        </button>
      ) : (
        <button className="catBtn">{title}</button>
      )}
    </>
  );
};
