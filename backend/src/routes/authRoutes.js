// Imports
const express = require('express');
const passport = require('passport');
const controller = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  passport.authenticate('signup', { session: false }),
  controller.registerUser
);

router.post(
  '/login',
  controller.loginUser
);

router.post(
  '/refreshToken',
  controller.refTok
);

router.post(
  '/logout',
  controller.logoutUser
);

module.exports = router;
