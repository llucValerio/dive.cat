// Imports
const express = require('express');
const controller = require('../controllers/equipmentController');

const router = express.Router();

router
  .route('/')
  .get(controller.getEquipment);

module.exports = router;
