import paths from './paths.json';


const useCheckLogin = () => {

  const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

  const access_token = () => {
    const strg = localStorage.getItem('userData');
    if(strg !== null) {
      const json = JSON.parse(strg);
      return JSON.stringify({
        access_token: json.access_token,
        token_type: json.token_type,
        id: json.id
      });
    }
    else
      return JSON.stringify({token_type: 'no-token'});
  }

  return fetch(`${reqPath}OAuth`,
  {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: access_token()
  })
  .then(res => res.json())
  .then(json => {
    if(json.code) {
      console.warn(json);
      return {
        logged: false,
        permission: 0
      }
    } else {
      localStorage.setItem('userData', JSON.stringify(json));
      if(typeof json.permissionLevel === 'number')
        return {
          logged: true,
          permission: json.permissionLevel
        }
      else
        return {
          logged: true,
          permission: 0
        }
    }
  });
}

export default useCheckLogin;