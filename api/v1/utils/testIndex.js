module.exports = function(db, index) {
  return testIdx();
  function testIdx() {
    return db.find({"number": index}).then(result => {
      if(result === undefined || result.length == 0) {
        return index;
      } else {
        index++;
        return testIdx();
      }
    })
  }
}