const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();

  // convention is that json web tokens have the properties:
  // sub (subject) and iat (issued-at time)
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token

  // req.user is supplied by passport's 'done' callback. See 'const localLogin'a in passport.js for details.
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new User({ email, password });
    user.save(function(err) {
      if (err) { return next(err); }
      res.json({ token: tokenForUser(user) });
    });
  });
};
