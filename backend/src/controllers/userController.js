const debug = require('debug')('diveServer:userController');
const User = require('../models/userModel');

async function setUser(req, res) {
  try {
    debug('setUsers');
    const newUser = await User.create(req.body);
    res.status(201);
    return res.json(newUser);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while creating an user: ${error}`);
  }
}

async function getUsers(req, res) {
  try {
    let allUsers = 0;
    if (Object.keys(req.query).length <= 0) {
      debug('getUsers');
      allUsers = await User.find();
    } else {
      debug('getUserByName');

      debug(req.query);
      allUsers = await User.find(req.query);
    }
    res.status(200);
    return res.json(allUsers);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while getting data: ${error}`);
  }
}

module.exports = {
  setUser,
  getUsers
};
