// Imports
const mongoose = require('mongoose');

// DataBase Model
const cartSchema = mongoose.Schema({
  name: String,
  brand: String,
  model: String
});

module.exports = mongoose.model('Items', cartSchema);
