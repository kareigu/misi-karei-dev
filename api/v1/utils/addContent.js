
module.exports = async function(db, content) {
  if(content.text) {
    const count = await db.count({})

    const quote = {
      text: content.text,
      number: count + 1
    };
  
    const testIndex = require('./testIndex');
    const result = await testIndex(db, quote.number);

    quote.number = result;
    const added = await db.insert(quote);
    return {
      message: `Added new quote #${added.number}`
    }
  } else {
    return {
      message: "Can't add empty quote"
    }
  }
  
}