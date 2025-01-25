const express = require('express');
const User = require('../components/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = "sua-chave-secreta";

router.post('/login', async (req, res) => {
  console.log('Dados recebidos:', req.body);
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ usuario: username });
    console.log('Usuário encontrado:', user);
    
    if (!user) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const isValidPassword = await bcrypt.compare(password, user.senha);
    console.log('Senha válida:', isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.usuario },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ message: 'Erro no servidor', error: err });
  }
});

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