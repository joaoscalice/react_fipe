import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';

const Login = ({ onLogin, onCadastro, cadastroData }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const usuarioValido = cadastroData?.usuario || 'admin'; // Usa o valor cadastrado ou o padrão
  const senhaValida = cadastroData?.senha || '12345'; // Usa o valor cadastrado ou o padrão

  useEffect(() => {
    // Preenche automaticamente os campos com os dados do cadastro, se disponíveis
    if (cadastroData) {
      setUsuario(cadastroData.usuario);
      setSenha(cadastroData.senha);
    }
  }, [cadastroData]);

  const handleLogin = () => {
    if (usuario === usuarioValido && senha === senhaValida) {
      onLogin(); // Chama a função de login para redirecionar para a página principal
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
      <Typography sx={{ marginTop: 2 }}>
        Não tem uma conta?{' '}
        <Link
          component="button"
          variant="body2"
          onClick={onCadastro} // Chama a função para redirecionar à tela de cadastro
        >
          Cadastre-se
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
