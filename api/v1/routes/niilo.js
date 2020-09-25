const addContent = require('../utils/addContent')

module.exports = function (db, router) {
  router.post('/', (req, res) => {
    addContent(db, req.body).then(data => {
      console.log(data);
      res.status(201);
      res.send(data);
    });
  });
  
  router.get('/', (req, res) => {
    db.find().then(data => {
      res.send(data);
    });
  });

  return router;
}