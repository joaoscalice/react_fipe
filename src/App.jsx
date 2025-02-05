import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabela from './components/Tabela/Tabela';
import TabelaWishList from './components/TabelaWishList/TabelaWishList';
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
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isCadastro, setIsCadastro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddToWishlistButton, setShowAddToWishlistButton] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

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
      alert('Selecione todos os campos corretamente');
      limparCampos();
      return;
    }
  
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca.codigo}/modelos/${modelo.codigo}/anos/${ano.codigo}`);
      setInfoVeiculo(response.data);
      setShowAddToWishlistButton(true);
  
      const wishlistResponse = await axios.get('http://localhost:5000/api/wishlist');
      if (wishlistResponse.data.length >= 2) {
        setShowAddToWishlistButton(false); 
      }
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
    setShowAddToWishlistButton(false);
  };

  const adicionarAWishlist = async () => {
    if (!infoVeiculo) return;
  
    const json = {
      marca: infoVeiculo.Marca,
      modelo: infoVeiculo.Modelo,
      ano: infoVeiculo.AnoModelo,
      valor: infoVeiculo.Valor,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/wishlist', json);
      alert('Carro adicionado à wishlist!');
    } catch (err) {
      console.error('Erro ao adicionar carro:', err);
      if (err.response && err.response.data.message) {
        alert(err.response.data.message); 
      } else {
        alert('Erro ao adicionar carro à wishlist');
      }
    }
  };

  const visualizarWishlist = async () => {
    if (showWishlist) {
      setShowWishlist(false);
    } else {
      try {
        const response = await axios.get('http://localhost:5000/api/wishlist');
        setWishlist(response.data);
        setShowWishlist(true);
      } catch (err) {
        console.error('Erro ao buscar wishlist:', err);
        alert('Erro ao carregar wishlist');
      }
    }
  };

  const limparWishlist = async () => {
    try {
      await axios.delete('http://localhost:5000/api/wishlist');
      setWishlist([]);
      alert('Wishlist limpa com sucesso!');
    } catch (err) {
      console.error('Erro ao limpar wishlist:', err);
      alert('Erro ao limpar wishlist');
    }
  };

  const marcas = data.map(item => item.nome);

  return (
    <>
      <Header />
      <Button
        onClick={handleLogout}
        variant="contained"
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
                marginLeft: '500px',
              }}
            >
              <Autocomplete
                disablePortal
                options={marcas}
                sx={{ flex: 1, minWidth: 110 }}
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

            <Box display="flex" justifyContent="flex-start" sx={{ marginTop: 2, width: '100%', paddingLeft: 95 }}>
              <Button onClick={fetchInfo} variant="contained">Consultar informações</Button>
              <Button onClick={limparCampos} variant="contained" color="secondary" sx={{ marginLeft: 2 }}>Limpar</Button>
            </Box>

            {infoVeiculo && (
              <>
                <Tabela infoVeiculo={infoVeiculo} />
                {showAddToWishlistButton && (
                  <Box sx={{ marginTop: 2, width: '100%', paddingLeft: 95 }}>
                    <Button onClick={adicionarAWishlist} variant="contained" color="primary">
                      Adicionar à wishlist
                    </Button>
                  </Box>
                )}
              </>
            )}

            <Box sx={{ marginTop: 2, width: '100%', paddingLeft: 95 }}>
              <Button
                onClick={visualizarWishlist}
                variant="contained"
                color="primary"
              >
                {showWishlist ? 'Fechar Wishlist' : 'Visualizar Wishlist'}
              </Button>
            </Box>

            {showWishlist && (
              <>
                {wishlist.length > 0 ? (
                  wishlist.map((item, index) => (
                    <Box key={index} sx={{ marginTop: 2, width: '100%' }}>
                      <TabelaWishList wishlist={[item]} /> 
                    </Box>
                  ))
                ) : (
                  <p>Nenhum item na wishlist.</p> 
                )}

                {wishlist.length > 0 && ( 
                  <Box sx={{ marginTop: 2, width: '100%', paddingLeft: 95 }}>
                    <Button
                      onClick={limparWishlist}
                      variant="contained"
                      color="secondary"
                    >
                      Limpar Wishlist
                    </Button>
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default App;