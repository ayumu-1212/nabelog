import { Link } from 'react-router-dom';
function Default() {
  return (
    <div>
      <h1>nabelogにようこそ！</h1>
      <ul>
        <li>
          <Link to="/shops">店舗一覧</Link>
        </li>
      </ul>
    </div>
  );
}

export default Default;
