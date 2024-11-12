import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#1976d2', padding: '10px', marginTop: '20px' }}>
      <Typography variant="body1" color="white" align="center">
        &copy; 2024 Marcas de Carros
      </Typography>
    </Box>
  );
}

export default Footer;
