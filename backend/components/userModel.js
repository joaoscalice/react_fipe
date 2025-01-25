const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  usuario: { type: String, unique: true },
  senha: String
});

module.exports = mongoose.model('User', userSchema);