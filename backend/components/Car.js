const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  ano: {
    type: Number,
    required: true,
  },
  valor: {
    type: String,
    required: true, 
  }
}, { timestamps: true }); 

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
