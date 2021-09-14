// Imports
const mongoose = require('mongoose');

// DataBase Model
const cartSchema = mongoose.Schema({
  name: String,
  surnames: String,
  email: String,
  password: String,
  picture: { type: String, default: 'https://i.ibb.co/kgqwWHz/240px-No-image-available.png' },
  licenseNumber: String,
  medicalCheckDate: { type: Date, default: Date.now },
  licenseExpeditionDate: { type: Date, default: Date.now },
  certifications: [{
    name: String,
    certifyingEntity: String
  }],
  center: {
    name: String,
    latitude: { type: mongoose.Schema.Types.Decimal128, default: 0 },
    longitude: { type: mongoose.Schema.Types.Decimal128, default: 0 }
  },
  buddies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
  immersions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Immersion' }]
});

module.exports = mongoose.model('User', cartSchema);
