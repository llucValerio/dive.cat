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
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
  },
  buddies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
  immersions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Immersion' }]
});

cartSchema.methods.isValidPassword = function isValidPassword(password) {
  return password === this.password;
};

module.exports = mongoose.model('User', cartSchema);
