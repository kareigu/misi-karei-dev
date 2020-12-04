const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
require('dotenv').config();
const path = require('path');

global.appRoot = path.resolve(__dirname);

const db = require('monk')(process.env.DB_URL);
const users = db.get('users');

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const certs = {
  key: fs.readFileSync('./certs/key.pem', 'utf8'),
  cert: fs.readFileSync('./certs/cert.pem', 'utf8')
};

const apiv1 = require('./api/v1/apiv1') (db);
app.use('/api/v1', apiv1);

app.use('/', express.static('./dist'));
app.get('/:var(quotes|niilo|debug)?', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
});

const httpsServer = https.createServer(certs, app);
httpsServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
//app.listen(PORT);
console.log(`Listening on port ${PORT}`);