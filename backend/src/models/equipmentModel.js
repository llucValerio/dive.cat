// Imports
const mongoose = require('mongoose');

// DataBase Model
const cartSchema = mongoose.Schema({
  brand: String
});

module.exports = mongoose.model('Equipment', cartSchema);
