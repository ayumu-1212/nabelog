import React, { useState, useEffect } from 'react'
import Shop from '../entity/shop'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
      <tr key={shops[i].ID}>
        <td>{shops[i].Name}</td>
        <td>{shops[i].Description}</td>
        <td>
          <Link to={`/shops/${shops[i].ID}`}>店舗詳細</Link>
        </td>
      </tr>
    )
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>店名</th>
            <th>紹介文</th>
            <th>詳細</th>
          </tr>
        </thead>
        <tbody>{trs}</tbody>
      </table>
    </div>
  )
}

export default ShopList
