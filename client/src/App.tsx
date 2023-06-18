import { Route, Routes } from 'react-router-dom';
import Configurator from './components/ConfiguratorPages/Configurator/Configurator';
import { Catalog } from './components/Catalog/Catalog';
import { CategoryCatalog } from './components/CategoryCatalog/CategoryCatalog';
import { ItemPage } from './components/ItemPage/ItemPage';
import { Favorites } from './components/Favourites/Favourites';
import { ToastContainer } from 'react-toastify';
import { Home } from './components/Home/Home';
import { Searchbar } from './components/Searchbar/Searchbar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSessionThunk } from './redux/thunk/user.action';
import { RootState } from './redux/store/store';
import { loadItems } from './redux/thunk/items.action';
import { Modal } from './components/Modal/Modal';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { Cart } from './components/Cart/Cart';
import { IPack } from './components/Home/itemCard';
import { initialCart } from './redux/slices/cart.slise';
import { initial } from './redux/slices/addItemsTo.slice';

function App() {
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.loaderSlice.load);

  const isAuth = useSelector((state: RootState) => state.userSlice.isAuth);

  useEffect(() => {
    dispatch(checkSessionThunk());
    dispatch(loadItems());

    if (!isAuth) {
      initialPack('cart');
      initialPack('compare');
      initialPack('favourite');
    }
  }, []);

  const initialPack = (packName: 'cart' | 'compare' | 'favourite') => {
    const pack = localStorage.getItem(packName);

    if (pack) {
      const parsed: IPack = JSON.parse(pack);

      dispatch(initial({ items: parsed.items, packName }));
    }
  };

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
              <Route path="favorites" element={<Favorites />} />
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
