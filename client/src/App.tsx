import { Link, Route, Routes } from 'react-router-dom';
import Configurator from './components/Configurator/Configurator';

function App() {
  return (
    <>
      <Link to="/configurator">Configurator</Link>
      <Routes>
        <Route path="/configurator" element={<Configurator />} />
      </Routes>
    </>
  );
}

export default App;
