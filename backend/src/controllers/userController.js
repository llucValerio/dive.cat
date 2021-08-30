const debug = require('debug')('diveServer:userController');
// const User = require('../models/userModel');

function getUsers(req, res) {
  debug('getUsers');
  res.send('getUsers');
}

module.exports = {
  getUsers
};
