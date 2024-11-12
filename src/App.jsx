import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Alert, Box } from '@mui/material';

function App() {
  const [data, setData] = useState([]);  // Armazenar as marcas de carros
  const [loading, setLoading] = useState(true);  // Controlar o estado de carregamento
  const [error, setError] = useState(null);  // Armazenar erros caso ocorram

  // Função para buscar as marcas de carros
  useEffect(() => {
    const fetchData = async () => {
      console.log('Iniciando requisição para marcas de carros...');
      try {
        // Requisição para a API de marcas de carros
        const response = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        console.log('Resposta recebida:', response.data);  // Logando a resposta da API
        setData(response.data);  // Armazenar as marcas recebidas
        setLoading(false);  // Alterar o estado de carregamento para false
      } catch (err) {
        console.error('Erro na requisição:', err);
        setError('Erro ao buscar dados');
        setLoading(false);
      }
    };

    fetchData();  // Chama a função para buscar os dados da API
  }, []);  // O array vazio faz a requisição ser feita apenas uma vez, na montagem do componente

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>
        Marcas de Carros
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <List>
          {data.map((item) => (
            <ListItem key={item.codigo} divider>
              <ListItemText 
                primary={item.nome}  // Nome da marca
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default App;

