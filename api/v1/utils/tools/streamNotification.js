const discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = function(body, homeContent) {
  if(body.hook) {
    const YOUTUBE_API = process.env.YOUTUBE_API;
    const ID = 'UCFpkeZklDZjWwmuatMTbjMw';
    const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${ID}&type=video&eventType=live&key=${YOUTUBE_API}`;
    const WH_ID = body.hook === 'ahha' 
                                  ? process.env.MAIN_ID
                                  : process.env.TEST_ID
    const WH_TOKEN = body.hook === 'ahha' 
                                  ? process.env.MAIN_TOKEN
                                  : process.env.TEST_TOKEN
    
    const webhook = new discord.WebhookClient(WH_ID, WH_TOKEN);
    return fetch(URL)
          .then(res => res.json())
          .then(json => {
            if(json.items[0]) {
              const info = json.items[0];
              homeContent.findOneAndUpdate({type: 'latestStream'}, {$set: {value: info.id.videoId}});
              webhook.send(`Striimi live! \n https://youtube.com/watch?v=${info.id.videoId}`);
              return { msg: 'Sent notification' };
            } else {
              return { msg: "Stream isn't live"};
            }
          })
  }
  
}