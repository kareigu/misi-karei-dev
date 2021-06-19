const discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = async function(body) {
  if(body.hook) {
    const WH_ID = body.hook === 'ahha' 
                                  ? process.env.MAIN_ID
                                  : process.env.TEST_ID
    const WH_TOKEN = body.hook === 'ahha' 
                                  ? process.env.MAIN_TOKEN
                                  : process.env.TEST_TOKEN
    
    const webhook = new discord.WebhookClient(WH_ID, WH_TOKEN);

    const message = body.pre 
      ? '```\n' + body.message + '```'
      : body.message;

    webhook.send(message);
  }
}