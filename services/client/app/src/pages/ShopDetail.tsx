import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Shop from '../entity/shop'
import axios from 'axios'

function ShopDetail(): JSX.Element {
  const [shop, setShop] = useState<Shop>()
  const params = useParams()
  const shopId: number = Number(params.id)

  useEffect(() => {
    axios
      .get(`/shops/${shopId}`)
      .then((res) => {
        setShop(res.data.shop)
      })
      .catch((err) => {
        console.log('err:', err)
      })
  }, [])

  return (
    <div>
      <h3>店名</h3>
      <p>{shop?.Name}</p>
      <h3>紹介文</h3>
      <p>{shop?.Description}</p>
    </div>
  )
}

export default ShopDetail
