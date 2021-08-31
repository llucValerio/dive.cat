// Imports
const express = require('express');
const controller = require('../controllers/itemController');

const router = express.Router();

router
  .route('/')
  .get(controller.getItems)
  .post(controller.setItem);

router
  .route('/:immersionId')
  .get(controller.getItemById)
  .put(controller.updateItemById)
  .delete(controller.deleteItemById);

module.exports = router;
