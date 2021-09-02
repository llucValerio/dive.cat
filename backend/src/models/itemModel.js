// Imports
const mongoose = require('mongoose');

// DataBase Model
const cartSchema = mongoose.Schema({
  name: String,
  brand: String,
  brandModel: String,
  picture: { type: String, default: 'https://i.ibb.co/kgqwWHz/240px-No-image-available.png' }
});

module.exports = mongoose.model('Item', cartSchema);
// module.exports = mongoose.model('Items', cartSchema);
