import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Container from '@mui/material/Container'

import ButtonAppBar from './components/organisms/Header'
import Default from './pages/Default'
import ShopDetail from './pages/ShopDetail'
import ShopList from './pages/ShopList'

function App(): JSX.Element {
  return (
    <>
      <ButtonAppBar />
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Default />} />
            <Route path="/shops" element={<ShopList />} />
            <Route path="/shops/:id" element={<ShopDetail />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App
