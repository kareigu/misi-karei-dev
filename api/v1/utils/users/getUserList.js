
module.exports = async function(db) {
  const userList = await db.find({});
  const filteredUsers = [];

  userList.forEach(el => {
    filteredUsers.push({
      id: el.id,
      username: el.username,
      avatar: el.avatar,
      permissionLevel: el.permissionLevel
    });
  });

  return filteredUsers;
}