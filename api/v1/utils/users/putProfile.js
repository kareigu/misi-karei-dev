const updateUser = require('./updateUser.js');
const addUser = require('./addUser.js');

module.exports = async function(db, userProfile) {
  const user = await db.findOne({id: userProfile.id});


  let userInfo = userProfile;

  if(user) {
    const temp = await updateUser(db, userInfo);
  } else {
    userInfo.permissionLevel = 0;
    userInfo = await addUser(db, userInfo);
  }

  return userInfo;
}