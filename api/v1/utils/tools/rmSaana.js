

module.exports = async function(db, id) {
  const removed = await db.findOneAndDelete({_id: id});
  return removed;
}