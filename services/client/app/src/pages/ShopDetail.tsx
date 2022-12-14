import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Typography } from '@mui/material'
import axios from 'axios'

import { BasicBreadcrumbs, Crumb } from '../components/organisms/Breadcrumbs'
import Shop from '../entity/shop'

const apiUrl = process.env.REACT_APP_SERVER_URL

function ShopDetail(): JSX.Element {
  const [shop, setShop] = useState<Shop>()
  const params = useParams()
  const shopId: number = Number(params.id)
  if (apiUrl === undefined) {
    console.error('envieonment props "SERVER_URL" is undefined')
    process.exit()
  }
  useEffect(() => {
    axios
      .get(`${apiUrl}/shops/${shopId}`)
      .then((res) => {
        setShop(res.data.shop)
      })
      .catch((err) => {
        console.log('err:', err)
      })
  }, [])

  const crumbs: Crumb[] = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Shops',
      link: '/shops',
    },
    {
      name: shop != null ? shop.Name : 'NoName',
      link: shop != null ? `/shops/${shop.ID}` : '',
    },
  ]

  return (
    <>
      <BasicBreadcrumbs crumbs={crumbs} />
      <Typography variant="h3">店舗詳細ページ</Typography>
      <div>
        <h3>店名</h3>
        <p>{shop?.Name}</p>
        <h3>紹介文</h3>
        <p>{shop?.Description}</p>
      </div>
    </>
  )
}

export default ShopDetail
