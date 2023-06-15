import { MouseEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Modal } from '../Modal/Modal';
import { Auth } from '../Auth/Auth';

import { ToastContainer, toast } from 'react-toastify';
import { ReactSVG } from 'react-svg';

import 'react-toastify/dist/ReactToastify.css';

export const Searchbar = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const closeModal = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof HTMLDivElement)) return;

    const { id } = event.target;

    if (id === 'colseModal') {
      setShowModal(false);
    }
  };

  const backHome = () => {
    if (pathname === '/') {
      window.scroll(0, 0);
    } else {
      navigate('/');
    }
  };

  const notify = () => toast('Wow so easy!');

  return (
    <>
      <div className="flex justify-between px-4 py-2 gap-1">
        <div className="flex w-1/3 gap-2">
          <button onClick={backHome} className="btn w-1/3 flex justify-center">
            <ReactSVG src="home.svg" className="w-6" />
          </button>
          <button onClick={notify} className="btn uppercase w-1/2 grow">
            каталог
          </button>
        </div>
        <div className="flex w-2/3">
          <input
            type="text"
            className="border rounded-l-xl border-black w-3/4 px-4 py-2"
          />
          <button className="w-1/4 flex justify-center px-2 py-2 border border-l-0 rounded-l-none border-black rounded-xl hover:bg-black hover:text-white">
            <ReactSVG src="search.svg" className="w-6" />
          </button>
        </div>
        <div className="flex w-1/3 gap-1">
          <button
            className="btn w-1/4 flex justify-center"
            onClick={() => setShowModal(true)}
          >
            <ReactSVG src="profile.svg" className="w-6" />
          </button>
          <button className="btn w-1/4 flex justify-center">
            <ReactSVG src="sravnenie.svg" className="w-6" />
          </button>
          <button className="btn w-1/4 flex justify-center">
            <ReactSVG src="favourite.svg" className="w-6" />
          </button>
          <button className="btn w-1/4 flex justify-center">
            <ReactSVG src="cart.svg" className="w-6" />
          </button>
        </div>
      </div>
      {showModal && (
        <Modal close={closeModal}>
          <Auth />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
};
