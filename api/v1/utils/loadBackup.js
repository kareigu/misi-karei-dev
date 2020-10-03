const saveBackup = require('./saveBackup');
const addContent = require('./addContent');

module.exports = async function(db, backup) {
  let response = {
    status: 500,
    message: 'Unknown error'
  }

  if(!backup || !backup.text) {
    console.log(backup);
    response.status = 400;
    response.message = 'Empty backup file';
    return response;
  }

  await saveBackup(db);
  await db.remove({});

  content = backup.text.split('\n');
  for (i in content) {
    await addContent(db, {text: content[i]});
  }

  response.status = 201;
  response.message = `Loaded backup with ${content.length} quotes`;
  return response;
}