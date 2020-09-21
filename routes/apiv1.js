const express = require('express');
const router = express.Router();


module.exports = function (db) {
  const niilo = db.get('niilo');
  const quotes = db.get('quotes');

  const quoteRoutes = require('./v1/quotes') (quotes);
  const niiloRoutes = require('./v1/niilo') (niilo);

  router.use('/quotes', quoteRoutes);
  router.use('/niilo', niiloRoutes);

  return router;
}