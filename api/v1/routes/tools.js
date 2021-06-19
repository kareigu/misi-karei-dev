const streamNotification = require('../utils/tools/streamNotification');
const readTimeouts = require('../utils/readTimeouts');
const checkPermissions = require('../utils/users/checkPermissions');
const checkID = require('../utils/users/checkID');

module.exports = function (db, router) {
  const users = db.get('users');
  const homeContent = db.get('homeContent');

  router.post('/tools/notify', (req, res) => {
    checkPermissions(users, req.headers.authorization, 4)
      .then(hasPermission => {
        if(hasPermission) {
          streamNotification(req.body, homeContent)
            .then(json => res.send(json));
        } else {
          res.send({msg: "Invalid permissions"});
        }
      });
    
  });

  router.get('/tools/timeout', (req, res) => {
    res.send(readTimeouts());
  });

  router.post('/tools/checkid', async (req, res) => {
    const response = await checkID(users, req.body);
    res.send(response);
  });

  return router;
}