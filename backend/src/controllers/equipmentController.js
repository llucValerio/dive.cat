const debug = require('debug')('diveServer:equipmentController');
const Equipment = require('../models/equipmentModel');
const User = require('../models/userModel');

async function updateUserEquipment(equipmentID, { userId }) {
  debug('updateUserEquipment');
  debug(equipmentID);
  debug(userId);
  const currentUser = await User.findById(userId);
}

async function getEquipment(req, res) {
  try {
    let allEquipment = 0;
    if (Object.keys(req.query).length <= 0) {
      debug('getEquipment');
      allEquipment = await Equipment.find()
        .populate('item');
    } else {
      debug('getEquipmentByQuery');
      allEquipment = await Equipment.find(req.query)
        .populate('item');
    }
    res.status(200);
    return res.json(allEquipment);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while getting data: ${error}`);
  }
}

async function setEquipment(req, res) {
  try {
    debug('setEquipment');
    if (Object.keys(req.query).length <= 0) {
      res.status(400);
      return res.send({ message: 'No user on query' });
    }
    const newEquipment = await Equipment.create(req.body);
    // eslint-disable-next-line no-underscore-dangle
    updateUserEquipment(newEquipment._id, req.query);
    res.status(201);
    return res.json(newEquipment);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while creating an element: ${error}`);
  }
}

async function getEquipmentById(req, res) {
  try {
    debug('getEquipmentById');
    const equipmentById = await Equipment.findById(req.params.equipmentId)
      .populate('item');
    res.status(200);
    return res.json(equipmentById);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while getting data: ${error}`);
  }
}

async function updateEquipmentById(req, res) {
  try {
    debug('updateEquipmentById');
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      req.params.equipmentId,
      req.body,
      { new: true }
    )
      .populate('item');
    res.status(200);
    return res.json(updatedEquipment);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while updating an element: ${error}`);
  }
}

async function deleteEquipmentById(req, res) {
  try {
    debug('deleteEquipmentById');
    const deletedEquipment = await Equipment.findByIdAndRemove(req.params.equipmentId);
    res.status(200);
    return res.json(deletedEquipment);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while deleting an element: ${error}`);
  }
}

module.exports = {
  getEquipment,
  setEquipment,
  getEquipmentById,
  updateEquipmentById,
  deleteEquipmentById
};
