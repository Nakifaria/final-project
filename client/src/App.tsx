<<<<<<< HEAD
import { Link, Route, Routes } from 'react-router-dom';
import Configurator from './components/Configurator/Configurator';
import { Favorites } from './components/Favourites/Favourites';

function App() {
  return (
    <>
      <Link to="/configurator">Configurator</Link>
      <Link to='/favorites'>Favorites</Link>
      <Routes>
        <Route path="/configurator" element={<Configurator />} />
        <Route path='/favorites' element={<Favorites />}></Route>
      </Routes>
    </>
  );
=======
import { Link, Route, Routes } from "react-router-dom";
import Configurator from "./components/Configurator/Configurator";
import { Catalog } from "./components/Catalog/Catalog";
import { CategoryCatalog } from "./components/CategoryCatalog/CategoryCatalog";
import { ItemPage } from "./components/ItemPage/ItemPage";

function App() {
  return <>
  <Routes>
    <Route path='/catalog' element={<Catalog/>}/>
    <Route path='/catalog/category' element={<CategoryCatalog/>}/>
    <Route path='/catalog/category/product' element={<ItemPage/>}/>
    <Route path="/configurator" element={<Configurator />} />
  </Routes>
  </>;
>>>>>>> dev
}

export default App;
