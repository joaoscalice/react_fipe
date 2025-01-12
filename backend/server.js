const express = require('express');
const connectDB = require('./db');

const app = express();

// Conectar ao MongoDB
connectDB();

// Configurar o servidor
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Definir a porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
