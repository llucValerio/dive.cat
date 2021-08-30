// Imports
const mongoose = require('mongoose');

// DataBase Model
const cartSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('User', cartSchema);
