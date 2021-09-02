// Imports
const express = require('express');
const passport = require('passport');
const controller = require('../controllers/itemController');

const router = express.Router();

router
  .route('/')
  .all(passport.authenticate('jwt', { session: false }))
  .get(controller.getItems)
  .post(controller.setItem);

router
  .route('/:itemId')
  .all(passport.authenticate('jwt', { session: false }))
  .get(controller.getItemById)
  .put(controller.updateItemById)
  .delete(controller.deleteItemById);

module.exports = router;
