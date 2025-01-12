import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { loginStyles } from './style';  

const Login = ({ onLogin, onCadastro }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const usuarioValido = 'admin';
  const senhaValida = '12345';

  const handleLogin = () => {
    if (usuario === usuarioValido && senha === senhaValida) {
      onLogin(); 
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <Box sx={loginStyles.container}>
        <Box sx={{ 
                width: '20%', 
                display: 'flex', 
                justifyContent: 'flex-start',  
                paddingLeft: '500px', 
              }}></Box>
      <Box sx={loginStyles.form}>
        <Typography sx={loginStyles.title}>Login</Typography>
        <TextField
          label="Usuário"
          variant="outlined"
          fullWidth
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
        <Button
          variant="contained"
          onClick={handleLogin}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Entrar
        </Button>
        <Typography sx={loginStyles.linkText}>
          Não tem uma conta?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={onCadastro}
          >
            Cadastre-se
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
