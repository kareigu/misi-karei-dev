const express = require('express');
const router = express.Router();



module.exports = function (db) {

  const niilo = db.get('niilo');
  const quotes = db.get('quotes');
  const users = db.get('users');

  const quoteRoutes = require('./routes/quotes') (quotes, router, users);
  const niiloRoutes = require('./routes/niilo') (niilo, router, users);
  const loginRoutes = require('./routes/login') (users, router);
  const toolRoutes = require('./routes/tools') (db, router);
  const homeRoutes = require('./routes/home') (db, router);

  router.get('/', (req, res) => res.sendStatus(404));

  router.use('/', [
                    quoteRoutes, 
                    niiloRoutes, 
                    loginRoutes,
                    toolRoutes,
                    homeRoutes
                  ]);

  
  return router;
}