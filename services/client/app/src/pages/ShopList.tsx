import React, { useState, useEffect } from 'react'
import Shop from '../entity/shop'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

function ShopList(): JSX.Element {
  const [shops, setShops] = useState<Shop[]>([])

  useEffect(() => {
    axios
      .get('/shops')
      .then((res) => setShops(res.data.shops))
      .catch((err) => {
        console.log('err:', err)
      })
  }, [])

  const trs = []
  for (let i = 0; i < shops.length; i++) {
    trs.push(
      <TableRow key={shops[i].ID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {shops[i].Name}
        </TableCell>
        <TableCell align="right">{shops[i].Description}</TableCell>
        <TableCell align="right">
          <Link to={`/shops/${shops[i].ID}`}>店舗詳細</Link>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>店名</TableCell>
            <TableCell align="right">紹介文</TableCell>
            <TableCell align="right">詳細</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{trs}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default ShopList
