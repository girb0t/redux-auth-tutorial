const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// requireAuth acts as a middleware that is used below
// This case uses the 'jwt' strategy and does NOT try to create a
// cookie-based session for the user (since we're using tokens)
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
