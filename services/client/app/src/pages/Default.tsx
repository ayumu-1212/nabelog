import React from 'react'

import { Store, Person } from '@mui/icons-material'
import { Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

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
      <Typography variant="h3">nabelogにようこそ</Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton href="/shops">
            <ListItemIcon>
              <Store />
            </ListItemIcon>
            <ListItemText primary="店舗一覧" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/influencers">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="インフルエンサー一覧" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )
}

export default Default
