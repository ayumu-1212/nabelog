import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Shop from '../entity/shop';
import axios from 'axios';

function ShopDetail() {
  const [shop, setShop] = useState<Shop>();
  const params = useParams();
  const shopId: number = Number(params.id);

  const onButtonClick = () => {
    axios.get(`/shops/${shopId}`).then((res) => {
      setShop(res.data.shop);
    });
  };

  return (
    <div>
      <button onClick={onButtonClick}>更新</button>
      <h3>店名</h3>
      <p>{shop?.Name}</p>
      <h3>紹介文</h3>
      <p>{shop?.Description}</p>
    </div>
  );
}

export default ShopDetail;
