import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabela from './components/Tabela/Tabela'; // Caminho correto para o arquivo Tabela
import { fetchMarcas } from './components/API/apifipe';
import { Container, Typography, CircularProgress, Alert, Box, Autocomplete, TextField, Button } from '@mui/material';

function App() {
  const [data, setData] = useState([]);  // Armazenar as marcas de carros
  const [loading, setLoading] = useState(true);  // Controlar o estado de carregamento
  const [error, setError] = useState(null);  // Armazenar erros caso ocorram
  const [marcaSelecionada, setMarca] = useState(''); // Estado para armazenar a marca
  const [modelos, setModelos] = useState([]); // Armazenar os modelos de carros

  // Função para buscar as marcas de carros
  useEffect(() => {
    const fetchData = async () => {
      try {
        const marcas = await fetchMarcas();  // Usar a função fetchMarcas de apifipe.js
        setData(marcas);
        setLoading(false);
      } catch (err) {
        console.error('Erro na requisição:', err);
        setError('Erro ao buscar dados');
        setLoading(false);
      }
    };

    fetchData();  // Chama a função para buscar os dados da API
  }, []);  // O array vazio faz a requisição ser feita apenas uma vez, na montagem do componente

  // Cria a lista de marcas para o Autocomplete
  let marcas = data.map(item => item.nome);

  // Função para buscar modelos de carros após selecionar uma marca
  const fetchModelos = async (codigo) => {
    setLoading(true);
    setError(null); // Reseta o erro antes da nova requisição

    try {
      const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codigo}/modelos`);
      setModelos(response.data.modelos); // Atualiza o estado com os modelos
    } catch (err) {
      console.error('Erro ao buscar modelos:', err);
      setError('Erro ao carregar modelos');
    } finally {
      setLoading(false);
    }
  };

  // Função chamada ao clicar no botão "Consultar modelos"
  const cliqueBotaoMarca = () => {
    const marca = data.find(item => item.nome === marcaSelecionada);
    if (marca) {
      fetchModelos(marca.codigo); // Faz a requisição usando o código da marca
    } else {
      setError('Marca não encontrada');
    }
  };

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
            onChange={(ev, novoValor) => setMarca(novoValor)}  // Atualiza a marca selecionada
            renderInput={(params) => <TextField {...params} label="Marcas" />}
          />
          <Button className="botao" variant="contained" onClick={cliqueBotaoMarca}>Consultar modelos</Button>

          {/* Exibe a Tabela de Modelos, se houver modelos */}
          {modelos.length > 0 && <Tabela modelos={modelos} />}
        </>
      )}
    </Container>
  );
}

export default App;
