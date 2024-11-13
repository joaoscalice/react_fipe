import React from 'react';
import { Typography, Box } from '@mui/material';

function Header() {
  return (
    <Box sx={{ backgroundColor: '#1976d2', padding: '20px' }}>
      <Typography variant="h4" color="white">
        Marcas de Carros
      </Typography>
    </Box>
  );
}

export default Header;

