// src/components/Footer/Footer.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { footerStyles } from './style';  // Importando os estilos

function Footer() {
  return (
    <Box sx={footerStyles.container}>
      <Box sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'flex-start',  // Ajusta para alinhar à esquerda
        paddingLeft: '800px',  // Ajusta o espaço à esquerda
      }}>
        <Typography sx={footerStyles.title}>
          © 2024 - Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
