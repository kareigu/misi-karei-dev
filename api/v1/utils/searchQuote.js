const getRandomIndex = require('./getRandomIndex');

module.exports = async function(db, searchParam) {
  if(!isNaN(searchParam)) {
    const idx = parseInt(searchParam);
    const res = await db.find({number: idx});
    if(res === undefined || res.length == 0) {
      return {text: `Nothing found at #${idx}`};
    }
    return res[0];
  } else {
    const regex = RegExp(`.*${searchParam}.*`, 'i');
    const res = await db.find({ text : regex });
    const idx = getRandomIndex(res.length - 1);
    return res[idx];
  }
}