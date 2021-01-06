const discordApi = require('../consts/discordAPI.js');
const { API_ENDPOINT } = discordApi;

const fetch = require('node-fetch');

const { OAUTH_ID, OAUTH_SECRET, REDIRECT_URL } = process.env;

module.exports = async function(db, userData) {

  try {
    const payload = new URLSearchParams();
    payload.append('client_id', OAUTH_ID);
    payload.append('client_secret', OAUTH_SECRET);
    payload.append('grant_type', 'refresh_token');
    payload.append('refresh_token', userData.refresh_token);
    payload.append('redirect_uri', REDIRECT_URL);
    payload.append('scope', 'identify');

    const data = await fetch(`${API_ENDPOINT}/oauth2/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload
      })
    
    const jsonData = await data.json();

    const temp = await db.findOneAndUpdate(
      {id: userData.id},
      {$set: {
        access_token: jsonData.access_token,
        refresh_token: jsonData.refresh_token,
        token_type: jsonData.token_type
      }}
    );

    return jsonData;
  } catch (err) {
    console.error('No profile')
  }
}