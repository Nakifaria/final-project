import { Link, Route, Routes } from 'react-router-dom';
import Configurator from './components/Configurator/Configurator';
import { Catalog } from './components/Catalog/Catalog';
import { CategoryCatalog } from './components/CategoryCatalog/CategoryCatalog';
import { ItemPage } from './components/ItemPage/ItemPage';
import { Favorites } from './components/Favourites/Favourites';
import { ToastContainer } from 'react-toastify';
import { Home } from './components/Home/Home';
import { Searchbar } from './components/Searchbar/Searchbar';

function App() {
  return (
    <div className="box-border">
      <header className="max-w-screen-lg mx-auto sticky top-0">
        <Searchbar />
      </header>
      <main className="max-w-screen-lg mx-auto">
        <Routes>
          <Route path="catalog" element={<Catalog />} />
          <Route path="category" element={<CategoryCatalog />} />
          <Route path="product" element={<ItemPage />} />
          <Route path="configurator" element={<Configurator />} />
          <Route path="favorites" element={<Favorites />} />
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
