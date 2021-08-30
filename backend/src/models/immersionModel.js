// Imports
const mongoose = require('mongoose');

// DataBase Model
const cartSchema = mongoose.Schema({
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Immersion', cartSchema);
