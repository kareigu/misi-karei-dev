
module.exports = async function(db) {
  const rawContent = await db.find({});
  return rawContent;
}