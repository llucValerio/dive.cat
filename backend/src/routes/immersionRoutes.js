// Imports
const express = require('express');
const controller = require('../controllers/immersionController');

const router = express.Router();

router
  .route('/')
  .get(controller.getImmersions);

module.exports = router;
