
module.exports = async function(db, body) {
  const id = parseInt(body.id);
  if(isNaN(id) || id === '')
    return `Invalid ID: ${id}`;

  const replaced = await db.findOneAndUpdate(
    {number: id},
    {$set: {text: body.text}}
  )

  if(replaced)
    return `Updated quote #${id}`;
  else
    return `Unable to update quote #${id}`;
}