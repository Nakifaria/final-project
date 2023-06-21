import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Modal } from '../Modal/Modal';
import { Auth } from '../Auth/Auth';

import 'react-toastify/dist/ReactToastify.css';

import { RootState } from '../../redux/store/store';
import { SVGComponent } from '../Svg/SVGComponent';
import { useAppSelector } from '../../redux/hook';

export const Searchbar = () => {
  const [showModal, setShowModal] = useState(false);

  const [disableTabFocus, setDisableTabFocus] = useState(false);

  const [dropButtons, setDropButtons] = useState(false);

  const dropDownBar = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAuth = useAppSelector((state: RootState) => state.userSlice.isAuth);

  const cartLength = useAppSelector(
    (state: RootState) => state.PackItemsSlice.cart
  ).length;

  const compareLength = useAppSelector(
    (state: RootState) => state.PackItemsSlice.compare
  ).length;

  const favouriteLength = useAppSelector(
    (state: RootState) => state.PackItemsSlice.favourite
  ).length;

  const [search, setSearch] = useState({
    value: '',
  });

  const changeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const closeModal = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof HTMLDivElement)) return;

    const { id } = event.target;

    if (id === 'colseModal') {
      setShowModal(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab' && disableTabFocus) {
      event.preventDefault();
    }
  };

  const backHome = () => {
    if (pathname === '/') {
      window.scroll(0, 0);
    } else {
      navigate('/');
    }
  };

  const profile = () => {
    if (isAuth) {
      navigate('/profile');
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div
        className={`flex justify-between px-4 py-2 gap-1 bg-white shadow-xl ${
          dropButtons ? '' : 'rounded-b-xl'
        } `}
      >
        <div className="flex w-1/3 gap-1 md:gap-2 lg:gap-2">
          <button onClick={backHome} className="btn w-1/3 flex justify-center">
            <SVGComponent svgName="home" />
          </button>
          <button
            onClick={() => {
              navigate('/catalog');
            }}
            className="btn uppercase grow"
          >
            каталог
          </button>
        </div>
        <div className="flex w-2/3">
          <input
            name="value"
            value={search.value}
            onChange={changeSearch}
            type="text"
            className="border rounded-l-xl border-black w-3/4 px-4 py-2"
            placeholder="поиск по названию"
          />
          <button
            onClick={() => {
              navigate(`/search/?q=${search.value}`), setSearch({ value: '' });
            }}
            className="w-1/4 flex justify-center px-2 py-2 border border-l-0 rounded-l-none border-black rounded-xl hover:bg-black hover:text-white"
          >
            <SVGComponent svgName="search" />
          </button>
        </div>
        <div className="flex w-1/6 md:w-1/3 lg:w-1/3 gap-1">
          <button
            className="btn w-1/4 hidden md:flex lg:flex justify-center"
            onClick={profile}
          >
            <SVGComponent svgName="profile" />
          </button>
          <button
            onClick={() => {
              navigate('/compare');
            }}
            className="btn w-1/4 hidden md:flex lg:flex justify-center"
          >
            <SVGComponent counter={compareLength} svgName="compare" />
          </button>
          <button
            className="btn w-1/4 hidden md:flex lg:flex justify-center"
            onClick={() => {
              navigate('/favourite');
            }}
          >
            <SVGComponent counter={favouriteLength} svgName="favourite" />
          </button>
          <button
            onClick={() => {
              navigate('/cart');
            }}
            className="btn w-1/4 hidden md:flex lg:flex justify-center"
          >
            <SVGComponent counter={cartLength} svgName="cart" />
          </button>
          <button
            onClick={() => {
              setDropButtons(!dropButtons);
            }}
            className="btn w-full flex md:hidden lg:hidden justify-center"
          >
            бутер
          </button>
        </div>
      </div>
      <div
        ref={dropDownBar}
        className={`${
          dropButtons ? 'flex' : 'hidden'
        }  flex-col md:hidden lg:hidden gap-2 px-4 mb-[10px] rounded-md shadow-xl bg-white py-4`}
      >
        <button className="btn w-full flex justify-center" onClick={profile}>
          <SVGComponent svgName="profile" />
        </button>
        <button
          className="btn w-full flex justify-center"
          onClick={() => {
            navigate('/compare');
            setDropButtons(false);
          }}
        >
          <SVGComponent counter={compareLength} svgName="compare" />
        </button>
        <button
          className="btn w-full flex justify-center"
          onClick={() => {
            navigate('/favourite');
            setDropButtons(false);
          }}
        >
          <SVGComponent counter={favouriteLength} svgName="favourite" />
        </button>
        <button
          onClick={() => {
            navigate('/cart');
            setDropButtons(false);
          }}
          className="btn w-full flex justify-center"
        >
          <SVGComponent counter={cartLength} svgName="cart" />
        </button>
      </div>
      {!isAuth && showModal && (
        <Modal
          close={closeModal}
          setDisableTabFocus={setDisableTabFocus}
          handleKeyDown={handleKeyDown}
        >
          <Auth />
        </Modal>
      )}
    </>
  );
};
