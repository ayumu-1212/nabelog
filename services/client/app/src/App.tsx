import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Container from '@mui/material/Container'

import ButtonAppBar from './components/organisms/Header'
import Default from './pages/Default'
import InfluencerDetail from './pages/InfluencerDetail'
import InfluencerList from './pages/InfluencerList'
import InfluencerNew from './pages/InfluencerNew'
import ShopDetail from './pages/ShopDetail'
import ShopList from './pages/ShopList'
import ShopNew from './pages/ShopNew'

function App(): JSX.Element {
  return (
    <>
      <ButtonAppBar />
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Default />} />
            <Route path="/shops" element={<ShopList />} />
            <Route path="/shops/new" element={<ShopNew />} />
            <Route path="/shops/:id" element={<ShopDetail />} />
            <Route path="/influencers/new" element={<InfluencerNew />} />
            <Route path="/influencers" element={<InfluencerList />} />
            <Route path="/influencers/:id" element={<InfluencerDetail />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App
