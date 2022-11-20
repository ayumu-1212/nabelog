import React from 'react';
import './App.css';

function App() {
  // let shops: [];
  fetch("http://localhost:8080/shops", {
    mode: 'cors'
  })
  .then(res => res.json()) 
  .then(json => {
    console.log(json.shops);
  });
  return (
    <div>
      <ul>
        <li>
          おみせ1
        </li>
        <li>
          おみせ2
        </li>
        <li>
          おみせ3
        </li>
      </ul>
    </div>
  );
}

export default App;
