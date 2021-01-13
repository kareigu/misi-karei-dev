const createDailyJob = require('../utils/homeContent/createDailyJob');
const fetchHomeContent = require('../utils/homeContent/fetchHomeContent');
const getHomeContent = require('../utils/homeContent/getHomeContent');
const setHomeContent = require('../utils/homeContent/setHomeContent');
const checkPermissions = require('../utils/users/checkPermissions');

module.exports = function(db, router) {
  const users = db.get('users');

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

  router.post('/home/content', async (req, res) => {
    if(!await checkPermissions(users, req.headers.authorization, 4)) {
      const dbResponse = await setHomeContent(homeContent, req.body);
      res.send(dbResponse);
    } else {
      res.send({message: 'Invalid permissions'})
    }
  });

  return router;
}