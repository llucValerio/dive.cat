const passport = require('passport');
const localStrategy = require('passport-local');
const debug = require('debug')('diveServer:localStrategy');
const bcrypt = require('bcrypt');
const User = require('../../models/userModel');

const saltRounds = 10;

passport.use(
  'signup',
  new localStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    ((req, email, password, next) => {
      try {
        const newUser = req.body;
        bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
          let user = await User.findOne({ email });
          if (user) {
            // return next(null, false, { message: 'User already registered.' });
            return next(null, { message: 'User already registered.' });
          }

          debug('encrypting...');
          newUser.password = hash;

          user = await User.create(newUser);
          return next(null, user);
        });
        // return next(null, user);
      } catch (error) {
        return next(error);
      }
    })
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

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // if (!user.isValidPassword(password)) {
          // return next(null, false, { message: 'Wrong Password' });
          return next(null, { message: 'Wrong Password' });
          // }
        }

        return next(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return next(null, false);
      }
    }
  )
);
