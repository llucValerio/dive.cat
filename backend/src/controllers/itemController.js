const debug = require('debug')('diveServer:itemController');
const Item = require('../models/itemModel');

async function getItems(req, res) {
  try {
    let allItems = 0;
    if (Object.keys(req.query).length <= 0) {
      debug('getItems');
      allItems = await Item.find().exec();
    } else {
      debug('getItemsByQuery');
      allItems = await Item.find(req.query).exec();
    }
    res.status(200);
    return res.json(allItems);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while getting data: ${error}`);
  }
}

async function setItem(req, res) {
  try {
    debug('setItem');
    const newItem = await Item.create(req.body).exec();
    res.status(201);
    return res.json(newItem);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while creating an element: ${error}`);
  }
}

async function getItemById(req, res) {
  try {
    debug('getItemById');
    debug(req.params.itemId);

    const itemById = await Item.findById(req.params.itemId).exec();
    res.status(200);
    return res.json(itemById);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while getting data: ${error}`);
  }
}

async function updateItemById(req, res) {
  try {
    debug('updateItemById');
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.itemId,
      req.body,
      { new: true }
    )
      .exec();
    res.status(200);
    return res.json(updatedItem);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while updating an element: ${error}`);
  }
}

async function deleteItemById(req, res) {
  try {
    debug('deleteItemById');
    const deletedItem = await Item.findByIdAndRemove(req.params.itemId).exec();
    res.status(200);
    return res.json(deletedItem);
  } catch (error) {
    res.status(500);
    return res.send(`An error occurred while deleting an element: ${error}`);
  }
}

module.exports = {
  getItems,
  setItem,
  getItemById,
  updateItemById,
  deleteItemById
};
