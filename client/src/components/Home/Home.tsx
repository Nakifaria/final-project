import { useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { useDispatch } from 'react-redux';
import { checkSessionThunk } from '../../redux/thunk/user.action';

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSessionThunk());
  }, []);

  return (
    <div className="box-border">
      <header className="max-w-screen-lg mx-auto sticky top-0">
        <Searchbar />
      </header>
      <main className="max-w-screen-lg mx-auto h-[2000px] border-red-500 border"></main>
    </div>
  );
};
