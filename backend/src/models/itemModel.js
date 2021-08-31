// Imports
const mongoose = require('mongoose');

// DataBase Model
const cartSchema = mongoose.Schema({
  name: String,
  brand: String,
  model: String,
  picture: { type: String, default: 'https://i.ibb.co/kgqwWHz/240px-No-image-available.png' }
});

module.exports = mongoose.model('Items', cartSchema);
