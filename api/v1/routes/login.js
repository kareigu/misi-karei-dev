const fetch = require('node-fetch');

const fetchDiscordProfile = require('../utils/users/fetchDiscordProfile.js');
const putProfile = require('../utils/users/putProfile');
const purgeUsers = require('../utils/users/purgeUsers.js');
const checkAuthentication = require('../utils/users/checkAuthentication.js');


const discordAPI = require('../utils/consts/discordAPI.js');

const { API_ENDPOINT } = discordAPI

module.exports = function(db, router) {
  router.post('/login', (req,res) => {

    const TEMP_PASS = process.env.TEMP_PASS;

    if(req.body.token === TEMP_PASS) {
      res.status(202);
      res.send({ 
        token: TEMP_PASS, 
        msg: 'Logged in',
        success: true
      });
    } else {
      res.status(200);
      res.send({ 
        token: '', 
        msg: 'Invalid password',
        success: false
      });
    }
  });

  router.get('/login/users', async (req, res) => {
    const userList = await db.find({});
    res.send(userList);
  });

  router.delete('/login/users', async (req, res) => {
    const dbResponse = await purgeUsers(db);
    res.send(dbResponse);
  });

  router.get('/OAuth', async (req, res) => {
    console.log(req.query);
    const { code } = req.query;
    const { OAUTH_ID, OAUTH_SECRET, REDIRECT_URL } = process.env;

    const payload = new URLSearchParams();
    payload.append('client_id', OAUTH_ID);
    payload.append('client_secret', OAUTH_SECRET);
    payload.append('grant_type', 'authorization_code');
    payload.append('code', code);
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
    const tokenData = await data.json();
    const { access_token } = tokenData;

    if(access_token && access_token !== null) {
      const discordProfile = await fetchDiscordProfile(tokenData);

      const fullProfile = discordProfile;
      fullProfile.access_token = access_token;
      fullProfile.refresh_token = tokenData.refresh_token;
      fullProfile.token_type = tokenData.token_type;

      const userProfile = await putProfile(db, fullProfile);
     
      const responseObj = {
        status: {
          code: 'success',
          message: 'Successfully logged in'
        },
        userData: {
          id: userProfile.id,
          username: userProfile.username,
          avatar: userProfile.avatar,
          access_token: userProfile.access_token,
          token_type: userProfile.token_type
        }
      }

      res.send(responseObj);
    }
    else {
      res.send({
        status: {
          code: 'failed',
          message: 'Problem fetching tokens from Discord'
        }
      });
    }

    
  });

  router.post('/OAuth', async (req, res) => {
    const discordInfo = await checkAuthentication(db, req.body);

    if(discordInfo.status)
      res.send(discordInfo.status);
    else {
      const { permissionLevel, access_token } = await db.findOne({id: discordInfo.id});
      discordInfo.permissionLevel = permissionLevel;
      discordInfo.access_token = access_token;
      res.send(discordInfo);
    }
  }); 

  return router;
}