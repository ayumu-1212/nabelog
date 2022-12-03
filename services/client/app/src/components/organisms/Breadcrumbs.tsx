import * as React from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

export interface Crumb {
  name: string
  link: string
}

interface Props {
  crumbs: Crumb[]
}

export function BasicBreadcrumbs(props: Props): JSX.Element {
  const crumbs: Crumb[] = props.crumbs
  const links = []
  for (let i = 0; i < crumbs.length; i++) {
    if (i !== crumbs.length - 1) {
      links.push(
        <Link underline="hover" color="inherit" href={crumbs[i].link}>
          {crumbs[i].name}
        </Link>
      )
    } else {
      links.push(<Typography color="text.primary">{crumbs[i].name}</Typography>)
    }
  }

  return (
    <div role="presentation" style={{ padding: 10 }}>
      <Breadcrumbs aria-label="breadcrumb">{links}</Breadcrumbs>
    </div>
  )
}
