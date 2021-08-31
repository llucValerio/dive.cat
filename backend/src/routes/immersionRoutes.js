// Imports
const express = require('express');
const passport = require('passport');
const controller = require('../controllers/immersionController');

const router = express.Router();

router
  .route('/')
  .all(passport.authenticate('jwt', { session: false }))
  .get(controller.getImmersions)
  .post(controller.setImmersion);

router
  .route('/:immersionId')
  .all(passport.authenticate('signup', { session: false }))
  .get(controller.getImmersionById)
  .put(controller.updateImmersionById)
  .delete(controller.deleteImmersionById);

module.exports = router;
