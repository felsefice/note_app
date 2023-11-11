import React from 'react';
import { Box, Typography } from '@mui/material';

function Header() {
  return (
    <Box sx={{color:"#9e9e9e", textAlign:"center", p:2}}>
      <Typography variant="h4">
        Notes App
      </Typography>
    </Box>
  )
}

export default Header