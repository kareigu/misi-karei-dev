
module.exports = async function(db, token, permLevel) {
  const user = await db.findOne({access_token: token});
  console.log(user);

  if(user === null)
    return false;

  if(user.permissionLevel >= permLevel)
    return true;
  else
    return false;
}