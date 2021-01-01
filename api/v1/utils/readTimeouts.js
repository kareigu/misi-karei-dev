const fs = require('fs');
const path = require('path');

module.exports = function() {
  const pathToData = path.join(__dirname, '../../../files/test.json')
  const Data = JSON.parse(fs.readFileSync(pathToData)).data;

  return Data;
}