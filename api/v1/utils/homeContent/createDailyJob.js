const CronJob = require('cron').CronJob;
const randomQuote = require('../randomQuote');

module.exports = function(db, collection) {
  const source = db.get(collection);
  const homeContent = db.get('homeContent');

  const typeName = 'daily' + collection.charAt(0).toUpperCase() + collection.slice(1);

  const job = new CronJob('15,30,45 * * * * *', () => {
    randomQuote(source).then(quote => {
      try {
        homeContent.findOneAndUpdate({type: typeName}, {$set: {value: quote.number}});
      } catch (err) {
        console.error(err);
      }
    });
  });

  return job;
}