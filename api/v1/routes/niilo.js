const addContent = require('../utils/addContent');
const checkAuth = require('../utils/checkAuth');

module.exports = function (db, router) {
  router.post('/niilo', (req, res) => {
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
  
  router.get('/niilo', (req, res) => {
    db.find().then(data => {
      res.send(data);
    });
  });

  return router;
}