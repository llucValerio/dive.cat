// Imports
const express = require('express');
const passport = require('passport');
const controller = require('../controllers/equipmentController');

const router = express.Router();

router
  .route('/')
  .all(passport.authenticate('jwt', { session: false }))
  .get(controller.getEquipment)
  .post(controller.setEquipment);

router
  .route('/:equipmentId')
  .all(passport.authenticate('signup', { session: false }))
  .get(controller.getEquipmentById)
  .put(controller.updateEquipmentById)
  .delete(controller.deleteEquipmentById);

module.exports = router;
