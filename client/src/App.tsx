import { Route, Routes } from "react-router-dom";
import { Catalog } from "./components/Catalog/Catalog";
import { CategoryCatalog } from "./components/CategoryCatalog/CategoryCatalog";
import { ItemPage } from "./components/ItemPage/ItemPage";

function App() {
  return <>
  <Routes>
    <Route path='/catalog' element={<Catalog/>}/>
    <Route path='/category' element={<CategoryCatalog/>}/>
    <Route path='/product' element={<ItemPage/>}/>
  </Routes>
  </>;
}

export default App;
