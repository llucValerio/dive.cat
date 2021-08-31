const debug = require('debug')('diveServer:equipmentController');
// const User = require('../models/userModel');

function getEquipment(req, res) {
  debug('getEquipment');
  res.send('getEquipment');
}

// function setEquipment(req, res) {
//   try {

//   } catch (error) {

//   }
// }

module.exports = {
  getEquipment
  // setEquipment
};
