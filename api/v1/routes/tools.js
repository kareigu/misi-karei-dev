const streamNotification = require('../utils/streamNotification');
const readTimeouts = require('../utils/readTimeouts');
const checkPermissions = require('../utils/users/checkPermissions');

module.exports = function (users, router) {
  router.post('/tools/notify', (req, res) => {
    checkPermissions(users, req.headers.authorization, 4)
      .then(hasPermission => {
        if(hasPermission) {
          streamNotification(req.body)
            .then(json => res.send(json));
        } else {
          res.send({msg: "Invalid permissions"});
        }
      });
    
  });

  router.get('/tools/timeout', (req, res) => {
    res.send(readTimeouts());
  });

  return router;
}