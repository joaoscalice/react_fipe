import axios from 'axios';

const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';  

export const fetchMarcas = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; 
  } catch (error) {
    throw new Error('Erro ao buscar as marcas de carros');
  }
};
