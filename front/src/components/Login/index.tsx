import React, { useEffect, useState } from 'react';
import checkLogin from '../../utils/Login';
import { UserInfo } from '../../utils/types/UserInfo';

import paths from '../../utils/paths.json';
import { ReactComponent as LoadingIcon } from '../../utils/loading2.svg';

type props = {
  path: 'login' | 'signout'
}

type loginResponse = {
  status: {
    code: 'success' | 'failed',
    message: string
  },
  userData?: {
    id: string,
    username: string,
    avatar: string,
    access_token: string
  }
}

const reqPath = process.env.NODE_ENV === 'development' ? paths.devPath : paths.productionPath;

function Login(props: props) {


  useEffect(() => {
    if(props.path === 'login') {
      const code = window.location.search;
  
      fetch(`${reqPath}OAuth${code}`)
        .then(res => res.json())
        .then((json: loginResponse) => {
          if(json.status.code === 'success') {
            if(json.userData) {
              const { userData } = json;
              localStorage.setItem('userData', JSON.stringify(userData));
              setUserInfo({
                username: userData.username,
                avatar: userData.avatar
              });
              setLoading(false);

              setTimeout(() => {
                window.location.href = '/';
              }, 1000);
            }
          } else {
            setUserInfo({
              username: 'Error',
              avatar: 'https://mxrr.dev/files/lmao.gif'
            })
            console.warn(json.status);
            setLoading(false);
          }
          
        });
    } else {
      localStorage.removeItem('userData');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  }, [props.path]);

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);

  return (
    <div style={{color: 'white'}}>
      {
        props.path === 'login' &&
        <div className="login">
          <h1>Login</h1>
          { loading &&
            <LoadingIcon />
          }
          { userInfo &&
            <div>
              <p>Logged in as {userInfo.username}</p>
              <img src={userInfo.avatar} alt={userInfo.username} />
            </div>
          }
        </div>
      }

      {
        props.path === 'signout' &&
        <div>
          <h1>Signed out</h1>
        </div>
      }
      
    </div>
  );
}

export default Login;