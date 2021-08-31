const debug = require('debug')('diveServer:itemController');
// const User = require('../models/userModel');

function getItems(req, res) {
  debug('getItems');
  res.send('getItems');
}

module.exports = {
  getItems
};
