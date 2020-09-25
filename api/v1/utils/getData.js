module.exports = async function(db, params) {
  if(params.fullList === 'true') {
    return db.find().then(res => res);
  } else {
    return db.count().then(count => {
      const index = getRandomInt(count);
      return db.find({"number": index}).then(result => {
        let output = result[0];
        
        if(params.raw === 'true') {
          if(output)
            return output.text;
          else
            return 'Error';
        } else {
          return output;
        }
      });
    });
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}