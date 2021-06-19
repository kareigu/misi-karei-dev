
module.exports = async function(db) {
  const log = await db.find({});
  return log.reverse();
}