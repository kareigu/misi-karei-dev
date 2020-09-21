const express = require('express');
const router = express.Router();


module.exports = function (db) {
  router.post('/', (req, res) => {
    const data = req.body;
  
    try {
      console.log(data);
      const quote = {
        text: data.text,
        number: db.countDocuments() + 1
      };
      db.insertOne(quote);
      res.status(201);
      res.send(`Added quote #${quote.number}`);
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