const addContent = require('../utils/addContent');
const checkAuth = require('../utils/checkAuth');
const getData = require('../utils/getData');

module.exports = function (db, router) {
  router.post('/', (req, res) => {
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
  
  router.get('/', (req, res) => {
    getData(db, req.query).then(response => {
      res.status(200);
      res.send(response);
    });
  });

  return router;
}