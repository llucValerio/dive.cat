// Imports
const mongoose = require('mongoose');

// DataBase Model
const cartSchema = mongoose.Schema({
  name: String,
  surnames: String,
  licenseNumber: String,
  picture: String,
  medicalCheckDate: { type: Date, default: Date.now },
  licenseExpeditionDate: { type: Date, default: Date.now },
  certifications: [{
    name: String,
    certifyingEntity: String
  }],
  center: {
    name: String,
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
  },
  buddies: [{
    buddie: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
});

module.exports = mongoose.model('User', cartSchema);
