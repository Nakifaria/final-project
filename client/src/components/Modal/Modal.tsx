import { KeyboardEvent, MouseEvent } from 'react';

interface IModalProps {
  children: JSX.Element;
  close?: (event: MouseEvent<HTMLDivElement>) => void;
  setDisableTabFocus?: React.Dispatch<React.SetStateAction<boolean>>;
  handleKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
}

export const Modal = ({
  children,
  close,
  setDisableTabFocus,
  handleKeyDown,
}: IModalProps) => {
  return (
    <div
      id="colseModal"
      onClick={close}
      onKeyDown={handleKeyDown}
      onFocus={() => setDisableTabFocus && setDisableTabFocus(true)}
      onBlur={() => setDisableTabFocus && setDisableTabFocus(false)}
      tabIndex={-1}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center"
      autoFocus
    >
      {children}
    </div>
  );
};
