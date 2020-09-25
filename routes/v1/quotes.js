
module.exports = function (db, router) {
  router.post('/', (req, res) => {
    const data = req.body;
  
    console.log(data);
    const quote = {
      text: data.text,
      number: db.count().then(count => count + 1)
    };
    db.insert(quote).then(succ => {
      res.status(201);
      res.send(succ);
    });
    /* res.status(201);
    res.send(`Added quote #${quote.number}`); */
  });
  
  router.get('/', (req, res) => {
    db.find().then(data => {
      res.send(data);
    });
  });

  return router;
}