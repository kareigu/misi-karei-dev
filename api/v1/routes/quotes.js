const addContent = require('../utils/addContent');
const checkAuth = require('../utils/checkAuth');
const getData = require('../utils/getData');
const removeContent = require('../utils/removeContent');
const saveBackup = require('../utils/saveBackup');
const loadBackup = require('../utils/loadBackup');
const editContent = require('../utils/editContent');

module.exports = function (db, router) {
  router.post('/quotes', (req, res) => {
    if(checkAuth(req.headers.authorization)) {
      addContent(db, req.body).then(data => {
        console.log(data);
        res.status(201);
        res.send(data);
      });
    } else {
      res.status(401);
      res.send({"Unauthorized": "Invalid token"});
    }
  });

  router.post('/quotes/backup', (req, res) => {
    if(checkAuth(req.headers.authorization)) {
      loadBackup(db, req.body).then(response => {
        console.log(req.body);
        res.status(response.status);
        res.send(response.message);
      });
    } else {
      res.status(401);
      res.send({"Unauthorized": "Invalid token"});
    }
  });
  
  router.get('/quotes', (req, res) => {
    getData(db, req.query).then(response => {
      res.status(200);
      res.send(response);
    });
  });

  router.get('/quotes/backup', (req, res) => {
    saveBackup(db).then(file => {
      res.status(200);
      res.setHeader('Content-type', "application/octet-stream");
      res.setHeader('Content-disposition', `attachment; filename=${file.name}`);
      res.send(file.contents);
    });
  });

  router.delete('/quotes', (req, res) => {
    if(checkAuth(req.headers.authorization)) {
      removeContent(db, req.body.id).then(data => {
        console.log(data);
        res.status(200);
        res.send(data);
      });
    } else {
      res.status(401);
      res.send({"Unauthorized": "Invalid token"});
    }
  });

  router.put('/quotes', (req, res) => {
    if(checkAuth(req.headers.authorization)) {
      editContent(db, req.body).then(data => {
        console.log(data);
        res.status(201);
        res.send(data);
      });
    } else {
      res.status(401);
      res.send({"Unauthorized": "Invalid token"});
    }
  });

  return router;
}