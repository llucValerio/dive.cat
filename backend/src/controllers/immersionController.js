const debug = require('debug')('diveServer:immersionController');
// const User = require('../models/userModel');

function getImmersions(req, res) {
  debug('getImmersions');
  res.send('getImmersions');
}

module.exports = {
  getImmersions
};
