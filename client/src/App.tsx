import { Link, Route, Routes } from 'react-router-dom';
import Configurator from './components/Configurator/Configurator';
import { Home } from './components/Home/Home';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path="/configurator" element={<Configurator />} />
        <Route path="" element={<Home />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
