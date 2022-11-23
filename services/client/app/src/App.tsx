import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShopList from './pages/ShopList';
import Default from './pages/Default';
import ShopDetail from './pages/ShopDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/shops" element={<ShopList />} />
        <Route path="/shops/:id" element={<ShopDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
