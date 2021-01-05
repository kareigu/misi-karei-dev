
const fetchDiscordProfile = require('./fetchDiscordProfile.js');
const refreshDiscordToken = require('./refreshDiscordToken.js');


module.exports = async function(db, data) {
  const responseTemplate = {
    status: {
      code: '',
      message: ''
    }
  }

  if(!data.access_token) {
    const status = {
      code: 'no-token',
      message: 'No token given in request'
    }
    responseTemplate.status = status;
    return responseTemplate;
  }

  let discordProfile = await fetchDiscordProfile(data);

  if(discordProfile.username === 'undefined#undefined') {
    const userData = await db.findOne({id: data.id});

    const newData = await refreshDiscordToken(db, userData);

    discordProfile = await fetchDiscordProfile(newData);
  }
    
    
  return discordProfile;
}