
module.exports = async function(db, rawContent) {
  const quotes = db.get('quotes');
  const niilo = db.get('niilo');

  const content = {};

  for(el of rawContent) {
    if(el.type === 'dailyQuotes')
      content[el.type] = await quotes.findOne({number: el.value});
    else if(el.type === 'dailyNiilo')
      content[el.type] = await niilo.findOne({number: el.value});
  }

  return content;
}