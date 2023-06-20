import { Route, Routes } from 'react-router-dom';
import Configurator from './components/ConfiguratorPages/Configurator/Configurator';
import { Catalog } from './components/Catalog/Catalog';
import { CategoryCatalog } from './components/CategoryCatalog/CategoryCatalog';
import { ItemPage } from './components/ItemPage/ItemPage';

import { ToastContainer } from 'react-toastify';
import { Home } from './components/Home/Home';
import { Searchbar } from './components/Searchbar/Searchbar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkSessionThunk } from './redux/thunk/user.action';
import { RootState } from './redux/store/store';
import { loadItems } from './redux/thunk/items.action';
import { Modal } from './components/Modal/Modal';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { Cart } from './components/Cart/Cart';

import { Compare } from './components/Compare/Compare';
import { Favourite } from './components/newFav/Favourite';
import { useAppSelector } from './redux/hook';
import { Profile } from './components/Profile/Profile';

function App() {
  const dispatch = useDispatch();

  const loading = useAppSelector((state: RootState) => state.loaderSlice.load);

  useEffect(() => {
    dispatch(loadItems());
    dispatch(checkSessionThunk());
  }, []);

  return (
    <>
      {!loading && (
        <div className="box-border">
          <header className="max-w-screen-xl mx-auto sticky top-0">
            <Searchbar />
          </header>
          <main className="max-w-screen-xl mx-auto">
            <Routes>
              <Route path="cart" element={<Cart />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="category/:catId" element={<CategoryCatalog />} />
              <Route path="product/:prodId" element={<ItemPage />} />
              <Route path="configurator" element={<Configurator />} />
              <Route path="profile" element={<Profile />} />
              <Route path="favourite" element={<Favourite />} />
              <Route path="compare" element={<Compare />} />

              <Route path="" element={<Home />} />
            </Routes>
          </main>
          <ToastContainer />
        </div>
      )}
      {loading && (
        <Modal>
          <PacmanLoader color="black" loading={loading} size={120} />
        </Modal>
      )}
    </>
  );
}
export default App;
