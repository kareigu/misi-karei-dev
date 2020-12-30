import React, { useEffect, useState } from 'react';
import checkLogin from '../../utils/Login';

type props = {
  path: 'login' | 'signout',
  loginState: {}
}

function Login(props: props) {

  function handleSubmit() {
    console.log(password);
    checkLogin(password)
              .then(success => {
                if(success) {
                  setStatus('Logged in');
                  window.location.href = '/';
                } else
                  setStatus('Wrong password');
              })
  }

  function handleSignout() {
    localStorage.removeItem('token');
    setTimeout(() => setStatus('Signed out'), 200);
    setTimeout(() => window.location.href = '/', 500);
  }

  useEffect(() => {
    if(props.path === 'signout')
      handleSignout();
  })

  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(props.path === 'login' ? 'Login' : 'Signing out');
  return (
    <div>
      {
        props.path === 'login' &&
        <div className="login">
          <h1>{status}</h1>
          <input 
            type="text" 
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          >
          </input>
          <button onClick={handleSubmit}>Login</button>
        </div>
      }

      {
        props.path === 'signout' &&
        <div>
          <h1>{ status }</h1>
        </div>
      }
      
    </div>
  );
}

export default Login;