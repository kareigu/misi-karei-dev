

module.exports = async function(db, nick) {
  const res = await db.insert(nick);
  return res;
}