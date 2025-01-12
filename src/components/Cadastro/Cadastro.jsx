import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { cadastroStyles } from './style';  

const Cadastro = ({ onFinalizar }) => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmeSenha, setConfirmeSenha] = useState('');
  const [error, setError] = useState('');

  const handleFinalizar = () => {
    if (senha !== confirmeSenha) {
      setError('As senhas não coincidem');
      return;
    }

    const formData = {
      nome,
      sobrenome,
      usuario,
      senha,
    };

    onFinalizar(formData); 
  };

  return (
    <Box sx={cadastroStyles.container}>
      <Box sx={cadastroStyles.form}>
        <Typography sx={cadastroStyles.title}>Cadastro</Typography>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Sobrenome"
          variant="outlined"
          fullWidth
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Nome para login"
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
        <TextField
          label="Confirme a senha"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmeSenha}
          onChange={(e) => setConfirmeSenha(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
        <Button
          variant="contained"
          onClick={handleFinalizar}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Finalizar Cadastro
        </Button>
      </Box>
    </Box>
  );
};

export default Cadastro;
