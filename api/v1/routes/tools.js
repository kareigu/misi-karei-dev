const streamNotification = require('../utils/tools/streamNotification');
const readTimeouts = require('../utils/readTimeouts');
const checkPermissions = require('../utils/users/checkPermissions');
const checkID = require('../utils/users/checkID');
const getSaana = require('../utils/tools/getSaana');
const addSaana = require('../utils/tools/addSaana');
const rmSaana = require('../utils/tools/rmSaana');

module.exports = function (db, router) {
  const users = db.get('users');
  const homeContent = db.get('homeContent');
  const saana = db.get('saana');

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

  router.get('/tools/saana', async (req, res) => {
    const nicks = await getSaana(saana)
    res.send(nicks);
  });

  router.post('/tools/saana', async (req, res) => {
    const perm = await checkPermissions(users, req.headers.authorization, 3);
    if(perm) {
      const response = await addSaana(saana, req.body);
      res.send(response);
    } else {
      res.send({msg: 'Invalid permissions'});
    }
  });

  router.delete('/tools/saana', async (req, res) => {
    const perm = await checkPermissions(users, req.headers.authorization, 3);
    if(perm) {
      const response = await rmSaana(saana, req.body.id);
      res.send(response);
    } else {
      res.send({msg: 'Invalid permissions'});
    }
  });

  router.post('/tools/checkid', async (req, res) => {
    const response = await checkID(users, req.body);
    res.send(response);
  });

  return router;
}