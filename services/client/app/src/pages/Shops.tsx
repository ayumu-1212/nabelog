import { useState } from "react";
import Shop from "../entity/shop";
import axios from "axios";

function Shops() {
  const [shops, setShops] = useState<Shop[]>([]);

  const onButtonClick = () => {
    axios.get("/shops").then((res) => setShops(res.data.shops));
  };

  const trs = [];
  for (let i = 0; i < shops.length; i++) {
    trs.push(
      <tr key={shops[i].ID}>
        <td>{shops[i].Name}</td>
        <td>{shops[i].Description}</td>
      </tr>
    );
  }

  return (
    <div>
      <button onClick={onButtonClick}>更新</button>
      <table>
        <thead>
          <tr>
            <th>店名</th>
            <th>紹介文</th>
          </tr>
        </thead>
        <tbody>{trs}</tbody>
      </table>
    </div>
  );
}

export default Shops;
