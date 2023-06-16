import { MouseEvent } from 'react';

import { ToastContainer, toast } from 'react-toastify';

interface IModalProps {
  children: JSX.Element;
  close?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const Modal = ({ children, close }: IModalProps) => {
  return (
    <div
      id="colseModal"
      onClick={close}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center"
    >
      {children}
    </div>
  );
};
