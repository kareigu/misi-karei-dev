const discordApi = require('../consts/discordAPI.js');

const { API_ENDPOINT } = discordApi;

module.exports = async function(db, access_token) {
  const responseTemplate = {
    status: {
      code: '',
      message: ''
    }
  }

  if(!access_token) {
    const status = {
      code: 'no-token',
      message: 'No token given in request'
    }
    responseTemplate.status = status;
    return responseTemplate;
  }


}