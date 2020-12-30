const streamNotification = require('../utils/streamNotification');

module.exports = function (router) {
  router.post('/tools/notify', (req, res) => {
    streamNotification(req.body)
      .then(json => res.send(json));
  });

  return router;
}