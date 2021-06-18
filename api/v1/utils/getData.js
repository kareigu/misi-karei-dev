const randomQuote = require('./randomQuote');
const searchQuote = require('./searchQuote');

module.exports = async function(db, params) {
  if(params.fullList === 'true') {
    return db.find().then(res => res);
  } else {
    let output;
    if(params.search === '§' || params.search === 'Â§') {
      const latest = await db.find({}, {sort: {number: -1}, limit: 1});
      output = latest[0]
    } else {
      if(params.search == undefined || params.search === '') {
        output = await randomQuote(db);
      } else {
        output = await searchQuote(db, params.search);
      }
    }

    if(!output)
      output = {text: `Èrror: invalid quote - ${params.search}`};

    if(params.raw === 'true') {
      return output.text;
    } else {
      return output;
    }
  }
}
