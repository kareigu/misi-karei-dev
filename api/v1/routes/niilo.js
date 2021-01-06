const addContent = require('../utils/addContent');
const checkAuth = require('../utils/checkAuth');
const getData = require('../utils/getData');
const removeContent = require('../utils/removeContent');
const saveBackup = require('../utils/saveBackup');
const loadBackup = require('../utils/loadBackup');
const editContent = require('../utils/editContent');
const checkPermissions = require('../utils/users/checkPermissions');

module.exports = function (db, router, usersDB) {

  router.post('/niilo', async (req, res) => {
    if(await checkPermissions(usersDB, req.headers.authorization, 3)) {
      addContent(db, req.body).then(data => {
        console.log(data);
        res.status(201);
        res.send(data);
      });
    } else {
      res.send({message: "Invalid permissions"});
    }
  });

  router.post('/niilo/backup', async (req, res) => {
    if(await checkPermissions(usersDB, req.headers.authorization, 5)) {
      loadBackup(db, req.body).then(response => {
        console.log(req.body);
        res.status(response.status);
        res.send(response.message);
      });
    } else {
      res.send({message: "Invalid permissions"});
    }
  });
  
  router.get('/niilo', (req, res) => {
    getData(db, req.query).then(response => {
      res.status(200);
      res.send(response);
    });
  });

  router.get('/niilo/backup', (req, res) => {
    saveBackup(db).then(file => {
      res.status(200);
      res.setHeader('Content-type', "application/octet-stream");
      res.setHeader('Content-disposition', `attachment; filename=${file.name}`);
      res.send(file.contents);
    });
  });


  router.delete('/niilo', async (req, res) => {
    if(await checkPermissions(usersDB, req.headers.authorization, 4)) {
      removeContent(db, req.body.id).then(data => {
        console.log(data);
        res.status(200);
        res.send(data);
      });
    } else {
      res.send({message: "Invalid token"});
    }
  });

  router.put('/niilo', async (req, res) => {
    if(await checkPermissions(usersDB, req.headers.authorization, 3)) {
      editContent(db, req.body).then(data => {
        console.log(data);
        res.status(201);
        res.send(data);
      });
    } else {
      res.send({message: "Invalid permissions"});
    }
  });

  return router;
}