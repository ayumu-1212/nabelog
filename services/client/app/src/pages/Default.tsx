import React from 'react'
import { Link } from 'react-router-dom'

import { BasicBreadcrumbs, Crumb } from '../components/organisms/Breadcrumbs'

function Default(): JSX.Element {
  const crumbs: Crumb[] = [
    {
      name: 'Home',
      link: '/',
    },
  ]
  return (
    <>
      <BasicBreadcrumbs crumbs={crumbs} />
      <div>
        <h1>nabelogにようこそ！</h1>
        <ul>
          <li>
            <Link to="/shops">店舗一覧</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Default
