import paths from './paths.json';

type loginResponse = {
  token: string,
  msg: string,
  success: boolean
}

const checkLogin = (token: String) => {

  const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

  return fetch(`${reqPath}login`,
    {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
    .then(res => res.json())
    .then((json: loginResponse) => {
      if(json.success) {
        localStorage.setItem('token', json.token);
        console.log(json.msg);
        return true;
      } else {
        localStorage.removeItem('token');
        console.log(json.msg);
        return false;
      }
    });
}

export default checkLogin;