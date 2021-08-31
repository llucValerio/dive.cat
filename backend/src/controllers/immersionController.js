const debug = require('debug')('diveServer:immersionController');
const Immersion = require('../models/immersionModel');

async function getImmersions(req, res) {
  try {
    let allImmersions = 0;
    if (Object.keys(req.query).length <= 0) {
      debug('getImmersions');
      allImmersions = await Immersion.find()
        .populate('buddies');
      res.status(200);
      return res.json(allImmersions);
    }
    debug('getImmersionsByQuery');
    allImmersions = await Immersion.find(req.query)
      .populate('buddies');
    res.status(200);
    return res.json(allImmersions);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while getting data: ${error}`);
  }
}

async function setImmersion(req, res) {
  try {
    debug('setImmersion');
    const newImmersion = await Immersion.create(req.body)
      .populate('buddies');
    res.status(201);
    return res.json(newImmersion);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while creating an element: ${error}`);
  }
}

async function getImmersionById(req, res) {
  try {
    debug('getImmersionById');
    const immersionById = await Immersion.findById(req.params.immersionId)
      .populate('buddies');
    res.status(200);
    return res.json(immersionById);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while getting data: ${error}`);
  }
}

async function updateImmersionById(req, res) {
  try {
    debug('updateImmersion');
    const updatedImmersion = await Immersion.findByIdAndUpdate(
      req.params.immersionId,
      req.body,
      { new: true }
    )
      .populate('buddies');
    res.status(200);
    return res.json(updatedImmersion);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while updating an element: ${error}`);
  }
}

async function deleteImmersionById(req, res) {
  try {
    debug('deleteImmersion');
    const deletedImmersion = await Immersion.findByIdAndRemove(req.params.immersionId);
    res.status(200);
    return res.json(deletedImmersion);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while deleting an element: ${error}`);
  }
}

module.exports = {
  getImmersions,
  setImmersion,
  getImmersionById,
  updateImmersionById,
  deleteImmersionById
};
