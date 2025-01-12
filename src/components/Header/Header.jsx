import React from 'react';
import { Typography, Box } from '@mui/material';
import { headerStyles } from './style';  

function Header() {
  return (
    <Box sx={headerStyles.container}>
      <Box sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'flex-start',  
        paddingLeft: '570px', 
      }}>
        <Typography sx={headerStyles.title}>
          Marcas de Carros
        </Typography>
      </Box>
    </Box>
  );
}

export default Header;
