import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shops from './pages/Shops';

function App() {
  return (
    <BrowserRouter>
      <h1>Hello React Router</h1>
      <Routes>
        <Route path="/shops" element={<Shops />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
