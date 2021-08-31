// Imports
const express = require('express');
const controller = require('../controllers/equipmentController');

const router = express.Router();

router
  .route('/')
  .get(controller.getEquipment)
  .post(controller.setEquipment);

router
  .route('/:equipmentId')
  .get(controller.getEquipmentById)
  .put(controller.updateEquipmentById)
  .delete(controller.deleteEquipmentById);

module.exports = router;
