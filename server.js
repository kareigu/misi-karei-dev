const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const path = require('path');
const sites = require('./sites.js');

require('dotenv').config({ path: path.join(__dirname, '.env') });
global.appRoot = path.resolve(__dirname);

const db = require('monk')(process.env.DB_URL);

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(compression());
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const certs = {
  key: fs.readFileSync('./certs/key.pem', 'utf8'),
  cert: fs.readFileSync('./certs/cert.pem', 'utf8')
};

const apiv1 = require('./api/v1/apiv1') (db);
app.use('/api/v1', apiv1);

app.use('/', express.static('./dist'));
app.get(`/:var(${sites.valid})?`, (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
});

const httpsServer = https.createServer(certs, app);
httpsServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
//app.listen(PORT);
//console.log(`Listening on port ${PORT}`);