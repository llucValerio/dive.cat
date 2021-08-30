const debug = require('debug')('diveServer:EquipmentController');
// const User = require('../models/userModel');

function getEquipment(req, res) {
  debug('getEquipment');
  res.send('getEquipment');
}

module.exports = {
  getEquipment
};
