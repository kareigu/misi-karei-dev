const express = require('express');
const router = express.Router();



module.exports = function (db) {

  const niilo = db.get('niilo');
  const quotes = db.get('quotes');

  const quoteRoutes = require('./routes/quotes') (quotes, router);
  const niiloRoutes = require('./routes/niilo') (niilo, router);
  const loginRoutes = require('./routes/login') (router);
  const toolRoutes = require('./routes/tools') (router);

  router.use('/', [
                    quoteRoutes, 
                    niiloRoutes, 
                    loginRoutes,
                    toolRoutes
                  ]);

  return router;
}