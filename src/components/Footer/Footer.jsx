import React from 'react';
import { Typography, Box } from '@mui/material';
import { footerStyles } from './style';  

function Footer() {
  return (
    <Box sx={footerStyles.container}>
      <Box sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'flex-start',  
        paddingLeft: '570px',  
      }}>
        <Typography sx={footerStyles.title}>
          © 2024 - Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
