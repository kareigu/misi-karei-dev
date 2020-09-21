const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const monk = require('monk');
const fs = require('fs');
const https = require('https');
const dotenv = require('dotenv').config();

const db = monk(process.env.DB_URL);

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const certs = {
  key: fs.readFileSync('./certs/privkey.pem', 'utf8'),
  cert: fs.readFileSync('./certs/fullchain.pem', 'utf8')
};


app.get('/', (req, res) => {
  res.send({"asd": "asd"});
});

const httpsServer = https.createServer(certs, app);
httpsServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));