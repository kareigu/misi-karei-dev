
function parseAccessToken() {
  const storage = localStorage.getItem('userData');

  let token = '';

  if(storage !== null)
    token = JSON.parse(storage).access_token;

  return token;
}

export default parseAccessToken;