import React, { useState, useEffect } from 'react';
import { fetchMarcas } from './API/apifipe';  
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Alert, Box } from '@mui/material';

function App() {
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marcas = await fetchMarcas();  
        setData(marcas);  
        setLoading(false);  
      } catch (err) {
        setError('Erro ao buscar dados');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              <ListItemText primary={item.nome} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default App;
