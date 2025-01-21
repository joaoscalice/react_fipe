const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { nome, sobrenome, usuario, senha } = req.body;

  try {
    const existingUser = await User.findOne({ usuario });
    if (existingUser) {
      return res.status(400).json({ message: 'Nome de usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = new User({
      nome,
      sobrenome,
      usuario,
      senha: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error: err });
  }
});

module.exports = router;
