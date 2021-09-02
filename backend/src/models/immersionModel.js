// Imports
const mongoose = require('mongoose');

// DataBase Model
const cartSchema = mongoose.Schema({
  startHour: { type: Number, default: 0 },
  startMinut: { type: Number, default: 0 },
  endHour: { type: Number, default: 0 },
  endMinut: { type: Number, default: 0 },
  visibility: String,
  comments: String,
  entry: String,
  seaConditions: String,
  waterType: String,
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
    // _id: false,
    deep: { type: Number, default: 0 },
    bottomMinuts: { type: Number, default: 0 }
  }],
  buddies: [{
    // _id: false,
    buddie: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    supervisor: { type: Boolean, default: false }
  }],
  pictures: [{ url: String }]
});

module.exports = mongoose.model('Immersion', cartSchema);
