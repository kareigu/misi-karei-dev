
module.exports = async function(db, id) {
  id = parseInt(id);
  if(isNaN(id) || id === '')
    return `Invalid ID: ${id}`;

  const removed = await db.findOneAndDelete({number: id});

  if(removed)
    return `Removed quote #${id}`;
  else
    return `Unable to remove quote #${id}`;
}