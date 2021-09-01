const passport = require('passport');
const localStrategy = require('passport-local');
const debug = require('debug')('diveServer:localStrategy');
const User = require('../../models/userModel');

passport.use(
  'signup',
  new localStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, next) => {
      try {
        let user = await User.findOne({ email });
        debug(user);
        if (user) {
          // return next(null, false, { message: 'User already registered.' });
          return next(null, { message: 'User already registered.' });
        }
        user = await User.create(req.body);
        return next(null, user);
      } catch (error) {
        return next(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, next) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          // return next(null, false, { message: 'User not found' });
          return next(null, { message: 'User not found' });
        }

        if (!user.isValidPassword(password)) {
          // return next(null, false, { message: 'Wrong Password' });
          return next(null, { message: 'Wrong Password' });
        }

        return next(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return next(null, false);
      }
    }
  )
);
