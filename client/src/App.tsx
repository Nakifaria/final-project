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
}

export default App;
