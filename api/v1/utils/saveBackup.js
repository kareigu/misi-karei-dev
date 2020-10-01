const fs = require('fs');

module.exports = async function(db) {
  dbContents = await db.find({});
  let backup = '';

  dbContents.forEach(el => {
    backup = backup.concat(`${el.text} \n`);
  });
  const filename = `backup_${Date.now()}.txt`;
  fs.writeFile(`backups/${filename}`, backup, err => {
    if(err) {
      console.log(err);
    } else {
      console.log("File was saved");
    }
  });

  console.log(filename);
  return filename;
}