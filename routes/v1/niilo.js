
module.exports = function (db, router) {
  router.post('/', (req, res) => {
    const data = req.body;
  
    try {
      console.log(data);
      const quote = {
        text: data.text,
        number: db.count() + 1
      };
      db.insert(quote);
      res.status(201);
      res.send(`Added niilo #${quote.number}`);
    } catch (err) {
      res.send(err);
    }
  });
  
  router.get('/', (req, res) => {
    db.find().then(data => {
      res.send(data);
    });
  });

  return router;
}