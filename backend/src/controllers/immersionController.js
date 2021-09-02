const debug = require('debug')('diveServer:immersionController');
const Immersion = require('../models/immersionModel');
const User = require('../models/userModel');

async function updateUserImmersion(immersionID, { userId }) {
  try {
    debug('updateUserImmersion');
    const currentUser = await User.findById(userId);
    if (Object.keys(currentUser).length > 0) {
      await User.findByIdAndUpdate(userId, { $addToSet: { immersions: immersionID } });
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function deleteUserImmersion(immersionID, { userId }) {
  try {
    debug('deleteUserImmersion');
    const currentUser = await User.findById(userId);
    if (Object.keys(currentUser).length > 0) {
      await User.findByIdAndUpdate(userId, { $pull: { immersions: { $in: [immersionID] } } });
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function getImmersions(req, res) {
  try {
    let allImmersions = 0;
    if (Object.keys(req.query).length <= 0) {
      debug('getImmersions');
      allImmersions = await Immersion.find()
        .populate({
          path: 'buddies.buddie',
          select: 'name surnames picture'
        });
    } else {
      debug('getImmersionsByQuery');
      allImmersions = await Immersion.find(req.query)
        .populate({
          path: 'buddies.buddie',
          select: 'name surnames picture'
        });
    }
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
    if (Object.keys(req.query).length <= 0) {
      res.status(400);
      return res.send({ message: 'No user on query' });
    }
    const newImmersion = await Immersion.create(req.body);
    // eslint-disable-next-line no-underscore-dangle
    const updateUser = updateUserImmersion(newImmersion._id, req.query);
    if (updateUser) {
      res.status(201);
    } else {
      res.status(404);
    }
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
      .populate({
        path: 'buddies.buddie',
        select: 'name surnames picture'
      });
    res.status(200);
    return res.json(immersionById);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while getting data: ${error}`);
  }
}

async function updateImmersionById(req, res) {
  try {
    debug('updateImmersionById');
    const updatedImmersion = await Immersion.findByIdAndUpdate(
      req.params.immersionId,
      req.body,
      { new: true }
    )
      .populate({
        path: 'buddies.buddie',
        select: 'name surnames picture'
      });
    res.status(200);
    return res.json(updatedImmersion);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while updating an element: ${error}`);
  }
}

async function deleteImmersionById(req, res) {
  try {
    debug('deleteImmersionById');
    if (req.body.userId === undefined) {
      res.status(400);
      return res.send({ message: 'No user on body' });
    }
    const deletedImmersion = await Immersion.findByIdAndRemove(req.params.immersionId);
    // eslint-disable-next-line no-underscore-dangle
    const updateUser = deleteUserImmersion(req.params.immersionId, req.body);
    if (updateUser) {
      res.status(200);
    } else {
      res.status(404);
    }
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
