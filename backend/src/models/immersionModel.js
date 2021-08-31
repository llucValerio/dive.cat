// Imports
const mongoose = require('mongoose');

// DataBase Model
const cartSchema = mongoose.Schema({
  startTime: String,
  endTime: String,
  visibility: String,
  comments: String,
  entry: String,
  seaConditions: String,
  waterType: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  place: {
    name: String,
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 }
  },
  date: { type: Date, default: Date.now },
  inicialBar: { type: Number, default: 0 },
  finalBar: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  neopreneThickness: { type: Number, default: 0 },
  air: { type: Boolean, default: true },
  nitroxPercentage: { type: Number, default: 0 },
  tankAirLiters: { type: Number, default: 0 },
  waterTemperature: { type: Number, default: 0 },
  airTemperature: { type: Number, default: 0 },
  immersionStages: [{
    deep: { type: Number, default: 0 },
    bottomMinuts: { type: Number, default: 0 }
  }],
  buddies: [{
    buddie: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    supervisor: { type: Boolean, default: false }
  }],
  pictures: [{ url: String }]
});

module.exports = mongoose.model('Immersion', cartSchema);
