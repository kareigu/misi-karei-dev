const announce = require('./announce');

module.exports = async function(db, body) {
  const newLog = {
    date: Date.now(),
    log: body.log
  }

  const a = await db.insert(newLog);

  if(body.announce) {
    const date = new Date(newLog.date);
    let message = `

    https://misi.mxrr.dev/ - ChangeLog
    ${date.toLocaleString()}`
    message += '\n```\n';
    message += newLog.log;
    message += '\n```'

    const body = {
      hook: 'ahha',
      message,
      pre: false
    }

    announce(body);
  }

  return {msg: 'New changelog entry added'}
}