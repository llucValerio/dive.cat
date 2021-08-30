// Imports
const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(controller.getUsers);

module.exports = router;
