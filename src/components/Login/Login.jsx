import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { loginStyles } from './style';
import axios from 'axios';

const Login = ({ onLogin, onCadastro }) => {
 const [usuario, setUsuario] = useState('');
 const [senha, setSenha] = useState('');
 const [error, setError] = useState('');
 const [message, setMessage] = useState('');

 const handleLogin = async () => {
   try {
     setError('');
     
     if (!usuario || !senha) {
       setError('Por favor, preencha todos os campos');
       return;
     }

     const response = await axios.post('http://localhost:5000/api/login', {
      username: usuario,
       password: senha
     });

     if (response.data && response.data.token) {
       localStorage.setItem('token', response.data.token);
       onLogin();
     } else {
       setError('Erro na resposta do servidor');
     }
   } catch (err) {
     console.error('Erro no login:', err);
     setError(err.response?.data?.message || 'Usuário ou senha inválidos');
   }
 };

 return (
   <Box sx={loginStyles.container}>
     <Box sx={{ 
         width: '20%', 
         display: 'flex', 
         justifyContent: 'flex-start',  
         paddingLeft: '700px', 
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
       {message && <Typography color="success" sx={{ marginBottom: 2 }}>{message}</Typography>}

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