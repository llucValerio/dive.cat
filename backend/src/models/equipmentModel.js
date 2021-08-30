// Imports
const mongoose = require('mongoose');

// DataBase Model
const cartSchema = mongoose.Schema({
  fins: {
    brand: String,
    model: String,
    purchaseDate: { type: Date, default: Date.now },
    numberOfImmersions: { type: Number, default: 0 }
  },
  mask: {
    brand: String,
    model: String,
    purchaseDate: { type: Date, default: Date.now },
    numberOfImmersions: { type: Number, default: 0 }
  },
  suite: {
    brand: String,
    model: String,
    purchaseDate: { type: Date, default: Date.now },
    numberOfImmersions: { type: Number, default: 0 }
  },
  diveComputer: {
    brand: String,
    model: String,
    purchaseDate: { type: Date, default: Date.now },
    numberOfImmersions: { type: Number, default: 0 }
  },
  jacket: {
    brand: String,
    model: String,
    purchaseDate: { type: Date, default: Date.now },
    maintenanceCheckDate: { type: Date, default: Date.now },
    numberOfImmersions: { type: Number, default: 0 }
  },
  firstStage: {
    brand: String,
    model: String,
    purchaseDate: { type: Date, default: Date.now },
    maintenanceCheckDate: { type: Date, default: Date.now },
    numberOfImmersions: { type: Number, default: 0 }
  },
  secondStage: {
    brand: String,
    model: String,
    purchaseDate: { type: Date, default: Date.now },
    maintenanceCheckDate: { type: Date, default: Date.now },
    numberOfImmersions: { type: Number, default: 0 }
  },
  octopus: {
    brand: String,
    model: String,
    purchaseDate: { type: Date, default: Date.now },
    maintenanceCheckDate: { type: Date, default: Date.now },
    numberOfImmersions: { type: Number, default: 0 }
  },
  pressureGauge: {
    brand: String,
    model: String,
    purchaseDate: { type: Date, default: Date.now },
    maintenanceCheckDate: { type: Date, default: Date.now },
    numberOfImmersions: { type: Number, default: 0 }
  }

});

module.exports = mongoose.model('Equipment', cartSchema);
