
module.exports = async function(db, newContent) {
  const keys = Object.keys(newContent);

  for(key of keys) {
    if(key === 'latestStream') {
      try {
        await db.findOneAndUpdate({type: key}, {$set: {value: newContent[key]}});
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await db.findOneAndUpdate({type: key}, {$set: {value: newContent[key]['number']}});
      } catch (err) {
        console.error(err);
      }
    }
  }

  return {message: 'Updated home content'};
}