module.exports = function(token) {
  if(token === process.env.SECRET)
    return true
  else
    return false
}