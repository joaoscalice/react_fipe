import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabela from './components/Tabela/Tabela';
import { fetchMarcas } from './components/API/apifipe';
import { Container, Typography, CircularProgress, Alert, Box, Button } from '@mui/material';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Cadastro from './components/Cadastro/Cadastro';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [marcaSelecionada, setMarca] = useState('');
  const [modelos, setModelos] = useState([]);
  const [modeloSelecionado, setModelo] = useState('');
  const [anos, setAnos] = useState([]);
  const [anoSelecionado, setAno] = useState('');
  const [infoVeiculo, setInfoVeiculo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Controle de login
  const [isCadastro, setIsCadastro] = useState(false); // Controle da tela de cadastro
  const [cadastroData, setCadastroData] = useState(null); // Armazena os dados do cadastro

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const marcas = await fetchMarcas();
        setData(marcas);
      } catch (err) {
        console.error('Erro na requisição:', err);
        setError('Erro ao buscar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); // Usuário logado
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Usuário deslogado
  };

  const handleCadastro = () => {
    setIsCadastro(true); // Exibe a tela de cadastro
  };

  const finalizarCadastro = (formData) => {
    console.log('Dados cadastrados:', formData);
    setCadastroData(formData); // Salva os dados do cadastro para preenchimento automático no login
    setIsCadastro(false); // Retorna à tela de login após o cadastro
  };

  if (isCadastro) {
    return <Cadastro onFinalizar={finalizarCadastro} />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} onCadastro={handleCadastro} cadastroData={cadastroData} />;
  }

  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          height: 'calc(100vh - 40px - 60px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 4,
          paddingRight: 2,
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Box display="flex" justifyContent="flex-start" sx={{ marginTop: 2, width: '100%', paddingLeft: 97 }}>
              <Button onClick={handleLogout} variant="outlined" color="secondary">
                Sair
              </Button>
            </Box>
            {infoVeiculo && <Tabela infoVeiculo={infoVeiculo} />}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default App;
