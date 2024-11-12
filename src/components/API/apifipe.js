// src/components/API/apifipe.js
import axios from 'axios';

const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';  // Endpoint de marcas de carros

// Função para buscar as marcas de carros
export const fetchMarcas = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;  // Retorna os dados das marcas de carros
  } catch (error) {
    throw new Error('Erro ao buscar as marcas de carros');
  }
};
