// Imports
const express = require('express');
const passport = require('passport');
const controller = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .all(passport.authenticate('jwt', { session: false }))
  .get(controller.getUsers);

router
  .route('/:userId')
  .all(passport.authenticate('jwt', { session: false }))
  .get(controller.getUserById)
  .put(controller.updateUserById)
  .delete(controller.deleteUserById);

module.exports = router;
