const express = require('express');
const Car = require('../components/Car');
const router = express.Router();

router.post('/wishlist', async (req, res) => {
  const { marca, modelo, ano, valor } = req.body;

  try {
    const carrosNaWishlist = await Car.find();

    if (carrosNaWishlist.length >= 2) {
      return res.status(400).json({ message: 'Você já atingiu o limite de 2 carros na wishlist!' });
    }

    const novoCarro = new Car({
      marca,
      modelo,
      ano,
      valor,
    });

    await novoCarro.save();
    res.status(201).json({ message: 'Carro adicionado à wishlist com sucesso!' });
  } catch (err) {
    console.error('Erro ao adicionar carro:', err);
    res.status(500).json({ message: 'Erro ao adicionar carro à wishlist', error: err });
  }
});

router.get('/wishlist', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    console.error('Erro ao buscar carros:', err);
    res.status(500).json({ message: 'Erro ao buscar carros', error: err });
  }
});

router.delete('/wishlist', async (req, res) => {
  try {
    await Car.deleteMany(); 
    res.status(200).json({ message: 'Wishlist apagada com sucesso!' });
  } catch (err) {
    console.error('Erro ao apagar wishlist:', err);
    res.status(500).json({ message: 'Erro ao apagar wishlist', error: err });
  }
});

module.exports = router;
