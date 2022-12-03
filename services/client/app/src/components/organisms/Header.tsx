import * as React from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material'

export default function ButtonAppBar(): JSX.Element {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nabelog
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
