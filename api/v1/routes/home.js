const createDailyJob = require('../utils/homeContent/createDailyJob');
const fetchHomeContent = require('../utils/homeContent/fetchHomeContent');
const getHomeContent = require('../utils/homeContent/getHomeContent');

module.exports = function(db, router) {
  const quotes = db.get('quotes');
  const niilo = db.get('niilo');

  const homeContent = db.get('homeContent');

  const dailyQuoteJob = createDailyJob(db, 'quotes');
  dailyQuoteJob.start();

  const dailyNiiloJob = createDailyJob(db, 'niilo');
  dailyNiiloJob.start();

  router.get('/home/content', async (req, res) => {
    const rawContent = await getHomeContent(homeContent);
    const content = await fetchHomeContent(db, rawContent);

    res.send(content);
  });

  return router;
}