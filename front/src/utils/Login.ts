import paths from './paths.json';
import { TUserContextFormat } from './UserContext';


type TLogResp = {
  logged: boolean,
  permission: number
}

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

  const checkAuth = () => {
    const userData = access_token();

    if (userData.includes('no-token')) {
      const promise: Promise<TUserContextFormat> = new Promise(res => {
        res({
          permLevel: 0,
          username: 'Guest',
          avatar: '',
          logged: false
        });
      })

      return promise;
    } else {
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
            const rtrn: TUserContextFormat = {
              permLevel: 0,
              username: '',
              avatar: '',
              logged: false
            }
            return rtrn;
          } else {
            localStorage.setItem('userData', JSON.stringify(json));
            if(typeof json.permissionLevel === 'number') {
              const rtrn: TUserContextFormat = {
                permLevel: json.permissionLevel,
                username: json.username,
                avatar: json.avatar,
                logged: true
              }
              return rtrn;
            } else {
              const rtrn: TUserContextFormat = {
                permLevel: 0,
                username: '',
                avatar: '',
                logged: false
              }
              return rtrn;
            }
          }
        });
    }
  }

  return checkAuth();
}

export default useCheckLogin;