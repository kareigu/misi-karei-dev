
module.exports = async function(db, data) {
  
  const updatedValues = [];

  try {
    data.forEach(el => {
      if(typeof el.permissionLevel === 'number') {
        db.findOneAndUpdate(
            {id: el.id},
            {$set: {
              permissionLevel: el.permissionLevel
            }}
        )
        updatedValues.push(`Updated ${el.id} permissions to level: ${el.permissionLevel}`);
      } else {
        updatedValues.push(`ID ${el.id} has invalid permissionLevel ${el.permissionLevel}`);
      }
    });
  } catch (err) {
    console.log(err);
  }
  return updatedValues;
}