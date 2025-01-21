const bcrypt = require('bcryptjs');
const User = require('./userModel');

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error: err });
  }
};

module.exports = { registerUser };
