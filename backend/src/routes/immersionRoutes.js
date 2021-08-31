// Imports
const express = require('express');
const controller = require('../controllers/immersionController');

const router = express.Router();

router
  .route('/')
  .get(controller.getImmersions);

router
  .route('/:immersionId')
  .get(controller.getImmersionById)
  .put(controller.updateImmersionById)
  .delete(controller.deleteImmersionById);

module.exports = router;
