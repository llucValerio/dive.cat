const debug = require('debug')('diveServer:userController');
const User = require('../models/userModel');

async function getUsers(req, res) {
  try {
    let allUsers = 0;
    if (Object.keys(req.query).length <= 0) {
      debug('getUsers');
      allUsers = await User.find()
        .populate('buddies')
        .populate('equipment')
        .populate('immersions');
    } else {
      debug('getUsersByQuery');
      allUsers = await User.find(req.query)
        .populate('buddies')
        .populate('equipment')
        .populate('immersions');
    }
    res.status(200);
    return res.json(allUsers);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while getting data: ${error}`);
  }
}

async function setUser(req, res) {
  try {
    debug('setUser');
    const newUser = await User.create(req.body);
    res.status(201);
    return res.json(newUser);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while creating an element: ${error}`);
  }
}

async function getUserById(req, res) {
  try {
    debug('getUserById');
    const userById = await User.findById(req.params.userId)
      .populate('buddies')
      .populate('equipment')
      .populate('immersions');
    res.status(200);
    return res.json(userById);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while getting data: ${error}`);
  }
}

async function updateUserById(req, res) {
  try {
    debug('updateUserById');
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    )
      .populate('buddies')
      .populate('equipment')
      .populate('immersions');
    res.status(200);
    return res.json(updatedUser);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while updating an element: ${error}`);
  }
}

async function deleteUserById(req, res) {
  try {
    debug('deleteUserById');
    const deletedUser = await User.findByIdAndRemove(req.params.userId);
    res.status(200);
    return res.json(deletedUser);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while deleting an element: ${error}`);
  }
}

module.exports = {
  getUsers,
  setUser,
  getUserById,
  updateUserById,
  deleteUserById
};
