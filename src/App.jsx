import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabela from './components/Tabela/Tabela'; 
import { fetchMarcas } from './components/API/apifipe';
import { Container, CircularProgress, Alert, Box, Autocomplete, TextField, Button } from '@mui/material';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isCadastro, setIsCadastro] = useState(false); 

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

  useEffect(() => {
    if (marcaSelecionada) {
      const marca = data.find(item => item.nome === marcaSelecionada);
      if (marca) {
        setModelo('');
        setAno('');
        setAnos([]);
        setInfoVeiculo(null); 
        fetchModelos(marca.codigo);
      }
    }
  }, [marcaSelecionada, data]);

  useEffect(() => {
    if (modeloSelecionado && marcaSelecionada) {
      const marca = data.find(item => item.nome === marcaSelecionada);
      const modelo = modelos.find(mod => mod.nome === modeloSelecionado);

      if (marca && modelo) {
        fetchAnos(marca.codigo, modelo.codigo);
      }
    }
  }, [modeloSelecionado, modelos, data, marcaSelecionada]);

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
  };

  const handleCadastro = () => {
    setIsCadastro(true); 
  };

  const finalizarCadastro = (formData) => {
    console.log('Dados cadastrados:', formData);
    setIsCadastro(false); 
  };

  if (isCadastro) {
    return <Cadastro onFinalizar={finalizarCadastro} />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} onCadastro={handleCadastro} />;
  }

  const fetchModelos = async (codigo) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigo}/modelos`);
      setModelos(response.data.modelos);
    } catch (err) {
      console.error('Erro ao buscar modelos:', err);
      setError('Erro ao carregar modelos');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnos = async (codigoMarca, codigoModelo) => {
    if (!codigoMarca || !codigoModelo) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigoMarca}/modelos/${codigoModelo}/anos`);
      setAnos(response.data);
    } catch (err) {
      console.error('Erro ao buscar os anos dos veículos:', err);
      setError('Erro ao carregar os anos dos veículos');
    } finally {
      setLoading(false);
    }
  };

  const fetchInfo = async () => {
    const marca = data.find(item => item.nome === marcaSelecionada);
    const modelo = modelos.find(mod => mod.nome === modeloSelecionado);
    const ano = anos.find(a => a.nome === anoSelecionado);

    if (!marca || !modelo || !ano) {
      setError('Selecione todos os campos corretamente');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos/${ano.codigo}`);
      setInfoVeiculo(response.data); 
    } catch (err) {
      console.error('Erro ao buscar as informações do veículo:', err);
      setError('Erro ao carregar as informações do veículo');
    } finally {
      setLoading(false);
    }
  };

  const limparCampos = () => {
    setMarca('');
    setModelo('');
    setAno('');
    setModelos([]);
    setAnos([]);
    setInfoVeiculo(null);
    setError(null);
  };

  const marcas = data.map(item => item.nome);

  return (
    <>
      <Header />
      <Button
        onClick={handleLogout}
        variant="outlined"
        color="error"
        sx={{
          position: 'absolute',
          top: 10,
          right: 20,
        }}
      >
        Logout
      </Button>
      <Container
        maxWidth="lg"
        sx={{
          height: 'calc(100vh - 80px - 60px)',   
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
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"  
              sx={{ 
                width: '100%', 
                gap: 2, 
                flexWrap: 'wrap', 
                maxWidth: 800, 
                marginLeft: '300px'  
              }}
            >
              <Autocomplete
                disablePortal
                options={marcas}
                sx={{ flex: 1, minWidth: 100 }}
                value={marcaSelecionada}
                onChange={(ev, novoValor) => {
                  setMarca(novoValor);
                  setModelo('');
                  setAno('');
                  setInfoVeiculo(null);
                  setAnos([]);
                }}
                renderInput={(params) => <TextField {...params} label="Marcas" />}
              />

              <Autocomplete
                disablePortal
                options={modelos.map(modelo => modelo.nome)}
                sx={{ flex: 1, minWidth: 125 }}
                value={modeloSelecionado}
                onChange={(ev, novoValor) => setModelo(novoValor)}
                renderInput={(params) => <TextField {...params} label="Modelos" />}
              />

              <Autocomplete
                disablePortal
                options={anos.map(ano => ano.nome)}
                sx={{ flex: 1, minWidth: 10 }}
                value={anoSelecionado}
                onChange={(ev, novoValor) => setAno(novoValor)}
                renderInput={(params) => <TextField {...params} label="Anos" />}
              />
            </Box>

            <Box display="flex" justifyContent="flex-start" sx={{ marginTop: 2, width: '100%', paddingLeft: 65 }}>
              <Button onClick={fetchInfo} variant="contained">Consultar informações</Button>
              <Button onClick={limparCampos} variant="outlined" color="secondary" sx={{ marginLeft: 2 }}>Limpar</Button>
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
