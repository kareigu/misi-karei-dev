const getRandomIndex = require('./getRandomIndex');

module.exports = async function(db) {
  const count = await db.count();
  const index = getRandomIndex(count);
  
  const result = await db.findOne({"number": index});

  if(result)
    return result;
  else
    return await db.findOne({"number": getRandomIndex(count)});
}