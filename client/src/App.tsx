
import { Link, Route, Routes } from "react-router-dom";
import Configurator from "./components/Configurator/Configurator";
import { Catalog } from "./components/Catalog/Catalog";
import { CategoryCatalog } from "./components/CategoryCatalog/CategoryCatalog";
import { ItemPage } from "./components/ItemPage/ItemPage";
import { ToastContainer } from "react-toastify";
import { Home } from "./components/Home/Home";

function App() {
  return <>
  <Routes>
    <Route path='/catalog' element={<Catalog/>}/>
    <Route path='/catalog/category' element={<CategoryCatalog/>}/>
    <Route path='/catalog/category/product' element={<ItemPage/>}/>
    <Route path="/configurator" element={<Configurator />} />
    <Route path="" element={<Home />} />
  </Routes>
     <ToastContainer />
  </>;

}

export default App;
