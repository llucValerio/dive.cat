const passport = require('passport');
const jwt = require('jsonwebtoken');
const debug = require('debug')('diveServer:authController');

let refreshTokens = [];

function registerUser(req, res) {
  debug('registerUser');
  res.send({
    user: req.user,
    message: 'Register works'
  });
}

async function loginUser(req, res, next) {
  debug('loginUser');
  passport.authenticate(
    'login',
    async (err, user) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred.');
          return next(error);
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
              { expiresIn: '1m' }
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
