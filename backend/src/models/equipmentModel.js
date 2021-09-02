// Imports
const mongoose = require('mongoose');

// DataBase Model
const cartSchema = mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  purchaseDate: { type: Date, default: Date.now },
  numberOfImmersions: { type: Number, default: 0 },
  maintenanceCheckDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Equipment', cartSchema);
