const passport = require('passport');
const jwt = require('jsonwebtoken');
const debug = require('debug')('diveServer:authController');

let refreshTokens = [];

function registerUser(req, res) {
  debug('registerUser');
  debug(req?.user.message === undefined);
  if (req?.user.message !== undefined) {
    res.send({
      message: req.user.message
    });
  } else {
    res.send({
      user: req.user,
      message: 'Register done'
    });
  }
}

async function loginUser(req, res, next) {
  debug('loginUser');
  passport.authenticate(
    'login',
    async (err, user) => {
      try {
        if (err) {
          const error = new Error('An error occurred.');
          return next(error);
        }
        debug(user?.message);
        switch (user?.message) {
          case 'User not found':
            res.status(404);
            return res.send();
          case 'Wrong Password':
            res.status(401);
            return res.send();
          default:
            break;
        }
        return req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);
            // eslint-disable-next-line no-underscore-dangle
            const data = { _id: user._id, email: user.email };
            const token = jwt.sign(
              { user: data },
              process.env.JWT_SECRET,
              { expiresIn: '15m' }
            );
            const refreshToken = jwt.sign(
              { user: data },
              process.env.JWT_SECRET
            );
            refreshTokens.push(refreshToken);
            return res.json({
              token,
              refreshToken
            });
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
}

function refTok(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }
  return jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    // eslint-disable-next-line no-underscore-dangle
    const data = { _id: user._id, email: user.email };
    const token = jwt.sign(
      { user: data },
      process.env.JWT_SECRET,
      { expiresIn: '1m' }
    );
    return res.json({
      token
    });
  });
}

function logoutUser(req, res) {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter((current) => current !== refreshToken);
  res.send('Logout successful');
}

module.exports = {
  registerUser,
  loginUser,
  refTok,
  logoutUser
};
