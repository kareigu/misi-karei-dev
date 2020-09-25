
module.exports = function(db, content) {
  return db.count({}).then(count => {
    const quote = {
      text: content.text,
      number: count - 15
    };

    const testIndex = require('./testIndex');
    return testIndex(db, quote.number).then(result => {
      quote.number = result;
      return db.insert(quote).then(data => data);
    });
  });
}