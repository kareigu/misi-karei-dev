const fetch = require('node-fetch');
const updateUser = require('./updateUser.js');
const addUser = require('./updateUser.js');

const discordApi = require('../consts/discordAPI.js');

const { API_ENDPOINT } = discordApi;

module.exports = async function(data) {

  try {
    const {token_type, access_token } = data;

    const userFetch = await fetch(`${API_ENDPOINT}/users/@me`, {
      method: 'GET',
      headers: {
        'Authorization': `${token_type} ${access_token}`
      }
    });
    const userData = await userFetch.json();

    const discordProfile = {
      id: userData.id,
      username: `${userData.username}#${userData.discriminator}`,
      avatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.webp?size=128`
    }

    return discordProfile;
  } catch (err) {
    console.error('No data to fetch profile');
    return {
      status: {
        message: "No data to fetch profile"
      }
    }
  }

  
}