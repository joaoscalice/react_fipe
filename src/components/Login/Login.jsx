import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  // Definindo as credenciais fixas
  const usuarioValido = 'admin';
  const senhaValida = '12345';

  const handleLogin = () => {
    if (usuario === usuarioValido && senha === senhaValida) {
      onLogin();  // Chama a função de login para redirecionar para a página principal
    } else {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <Typography variant="h5" gutterBottom>Login</Typography>
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
      >
        Entrar
      </Button>
    </Box>
  );
};

export default Login;
