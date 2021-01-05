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
      return 'no-token';
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
  .then(json => console.log(json));
}

export default useCheckLogin;