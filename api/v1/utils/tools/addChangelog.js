

module.exports = async function(db, body) {
  const newLog = {
    date: Date.now(),
    log: body.log
  }

  db.insert(newLog);
  return {msg: 'New changelog entry added'}
}