

module.exports = async function(db, body) {
  const {id, permlevel} = body;

  const user = await db.findOne({ id });

  const res = {
    id,
    permlevel: user.permissionLevel,
    permitted: user.permissionLevel >= permlevel,
  }

  return res;
}