const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.postMessage('/api/surveys', requireLogin, (req, res) => {});
};
