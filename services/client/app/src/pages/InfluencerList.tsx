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
import Influencer from '../entity/influencer'

const apiUrl = process.env.REACT_APP_SERVER_URL

function InfluencerList(): JSX.Element {
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const crumbs: Crumb[] = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Influencers',
      link: '/influencers',
    },
  ]
  if (apiUrl === undefined) {
    console.error('envieonment props "SERVER_URL" is undefined')
    process.exit()
  }

  const onDelete = (influencerId: number): void => {
    const newInfluencers: Influencer[] = influencers.filter((influencer) => influencer.ID !== influencerId)
    setInfluencers(newInfluencers)
    axios
      .delete(`${apiUrl}/influencers/${influencerId}`)
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
      .get(`${apiUrl}/influencers`)
      .then((res) => setInfluencers(res.data.influencers))
      .catch((err) => {
        console.log('err:', err)
      })
  }, [])

  const trs = []
  for (let i = 0; i < influencers.length; i++) {
    trs.push(
      <TableRow key={influencers[i].ID} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {influencers[i].Name}
        </TableCell>
        <TableCell align="right">{influencers[i].Description}</TableCell>
        <TableCell align="right">
          <Link href={`/influencers/${influencers[i].ID}`}>インフルエンサー詳細</Link>
        </TableCell>
        <TableCell align="right">
          <Link
            onClick={() => {
              onDelete(influencers[i].ID)
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
          <Typography variant="h3">インフルエンサー一覧ページ</Typography>
        </Grid>
        <Grid item xs={4} dir="rtl">
          <IconButton color="primary" aria-label="add to influencer" size="large" href="/influencers/new">
            <AddCircleOutline />
          </IconButton>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
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

export default InfluencerList
