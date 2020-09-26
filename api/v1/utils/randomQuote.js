const getRandomIndex = require('./getRandomIndex');

module.exports = async function(db) {
  return db.count().then(count => {
    const index = getRandomIndex(count);
    return db.find({"number": index}).then(result => {
      const idx = getRandomIndex(result.length - 1);
      return result[idx];
    });
  });
}