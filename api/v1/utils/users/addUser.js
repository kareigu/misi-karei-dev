
module.exports = async function(db, userData) {

  return await db.insert(userData);
}