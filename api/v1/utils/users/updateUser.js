
module.exports = async function(db, userData) {

  const {
    avatar,
    username,
    access_token,
    refresh_token,
    token_type
  } = userData;

  const updatedUser = await db.update({
    id: userData.id },
    {
      $set: {
      avatar,
      username,
      access_token,
      refresh_token,
      token_type
    }
  });

  return updatedUser;
}