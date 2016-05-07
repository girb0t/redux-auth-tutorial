module.exports = function(app) {
  // params
  // req => request
  // res => response
  // next => for error handling
  app.get('/', function(req, res, next) {
    res.send(['water', 'phone', 'paper']);
  });
}
