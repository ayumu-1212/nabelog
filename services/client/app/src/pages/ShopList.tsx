import React, { useState, useEffect } from 'react'

import { AddCircleOutline } from '@mui/icons-material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import axios from 'axios'

import { BasicBreadcrumbs, Crumb } from '../components/organisms/Breadcrumbs'
import Shop from '../entity/shop'

function ShopList(): JSX.Element {
  const [shops, setShops] = useState<Shop[]>([])
  const crumbs: Crumb[] = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Shops',
      link: '/shops',
    },
  ]

  const onDelete = (shopId: number): void => {
    const newShops: Shop[] = shops.filter((shop) => shop.ID !== shopId)
    setShops(newShops)
    axios
      .delete(`/shops/${shopId}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log('err:', err)
      })
      .finally(() => {
        console.info('ローディング表示終了')
      })
  }

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
          <Link href={`/shops/${shops[i].ID}`}>店舗詳細</Link>
        </TableCell>
        <TableCell align="right">
          <Link
            onClick={() => {
              onDelete(shops[i].ID)
            }}
          >
            削除
          </Link>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <>
      <BasicBreadcrumbs crumbs={crumbs} />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h3">店舗一覧ページ</Typography>
        </Grid>
        <Grid item xs={4} dir="rtl">
          <IconButton color="primary" aria-label="add to shop" size="large" href="/shops/new">
            <AddCircleOutline />
          </IconButton>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>店名</TableCell>
              <TableCell align="right">紹介文</TableCell>
              <TableCell align="right">詳細</TableCell>
              <TableCell align="right">削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{trs}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ShopList
