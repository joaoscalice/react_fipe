import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabela from './components/Tabela/Tabela'; 
import { fetchMarcas } from './components/API/apifipe';
import { Container, Typography, CircularProgress, Alert, Box, Autocomplete, TextField, Button } from '@mui/material';

function App() {
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const [marcaSelecionada, setMarca] = useState(''); 
  const [modelos, setModelos] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marcas = await fetchMarcas();  
        setData(marcas);
        setLoading(false);
      } catch (err) {
        console.error('Erro na requisição:', err);
        setError('Erro ao buscar dados');
        setLoading(false);
      }
    };

    fetchData();  
  }, []);  

  useEffect(() => {
    if (marcaSelecionada) {
      const marca = data.find(item => item.nome === marcaSelecionada);
      if (marca) {
        fetchModelos(marca.codigo); 
      }
    }
  }, [marcaSelecionada, data]); 

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
            onChange={(ev, novoValor) => setMarca(novoValor)}  
            renderInput={(params) => <TextField {...params} label="Marcas" />}
          />

          <Autocomplete
            disablePortal
            options={modelos.map(modelo => modelo.nome)} 
            sx={{ width: 300, marginTop: 2 }}
            renderInput={(params) => <TextField {...params} label="Modelos" />}
          />

          <Button className="botao" variant="contained" sx={{ marginTop: 2 }}>Consultar modelos</Button>

          {/*modelos.length > 0 && <Tabela modelos={modelos} />*/}
        </>
      )}
    </Container>
  );
}

export default App;