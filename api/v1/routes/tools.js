const streamNotification = require('../utils/streamNotification');
const readTimeouts = require('../utils/readTimeouts');

module.exports = function (router) {
  router.post('/tools/notify', (req, res) => {
    streamNotification(req.body)
      .then(json => res.send(json));
  });

  router.get('/tools/timeout', (req, res) => {
    res.send(readTimeouts());
  });

  return router;
}