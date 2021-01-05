const updateUser = require('./updateUser.js');
const addUser = require('./addUser.js');

module.exports = async function(db, userProfile) {
  const user = await db.findOne({id: userProfile.id});


  let userInfo;

  if(user) {
    userProfile.permissionLevel = 3;
    const temp = await updateUser(db, userProfile);
    userInfo = userProfile;
  } else {
    userInfo = await addUser(db, userProfile);
  }

  return userInfo;
}