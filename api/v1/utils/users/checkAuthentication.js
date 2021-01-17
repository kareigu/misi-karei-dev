
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
    const status = {
      code: 'Token-expired',
      message: 'Access token has expired'
    }
    responseTemplate.status = status;
    return responseTemplate;
  }
    
    
  return discordProfile;
}