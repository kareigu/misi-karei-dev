const getHomeContent = require('./getHomeContent');

module.exports = async function(db, newContent) {

  for(el of newContent) {
    try {
      await db.findOneAndUpdate({type: el.type}, {$set: {value: el.value}});
    } catch (err) {
      console.error(err);
    }
  }
  const newData = await getHomeContent(db);

  return newData;
}