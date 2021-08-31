// Imports
const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(controller.getUsers)
  .post(controller.setUser);

router
  .route('/:userId')
  .get(controller.getUserById)
  .put(controller.updateUserById)
  .delete(controller.deleteUserById);

module.exports = router;
