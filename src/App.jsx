import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabela from './components/Tabela/Tabela'; 
import { fetchMarcas } from './components/API/apifipe';
import { Container, Typography, CircularProgress, Alert, Box, Autocomplete, TextField } from '@mui/material';

function App() {
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  
  const [marcaSelecionada, setMarca] = useState(''); 
  const [modelos, setModelos] = useState([]); 
  const [modeloSelecionado, setModelo] = useState(''); 
  const [anos, setAnos] = useState([]); 

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
        setAnos([]); 
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

  const marcas = data.map(item => item.nome);

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        React FIPE
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Autocomplete
            disablePortal
            options={marcas}
            sx={{ width: 300 }}
            value={marcaSelecionada}
            onChange={(ev, novoValor) => {
              setMarca(novoValor);
              setModelo(''); 
              setAnos([]); 
            }}
            renderInput={(params) => <TextField {...params} label="Marcas" />}
          />

          <Autocomplete
            disablePortal
            options={modelos.map(modelo => modelo.nome)} 
            sx={{ width: 300, marginTop: 2 }}
            value={modeloSelecionado}
            onChange={(ev, novoValor) => setModelo(novoValor)}
            renderInput={(params) => <TextField {...params} label="Modelos" />}
          />

          <Autocomplete
            disablePortal
            options={anos.map(ano => ano.nome)}  
            sx={{ width: 300, marginTop: 2 }}
            renderInput={(params) => <TextField {...params} label="Anos" />}
          />
        </>
      )}
    </Container>
  );
}

export default App;
