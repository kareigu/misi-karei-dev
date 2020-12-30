import React, { useState } from 'react';
import checkLogin from '../../utils/Login';

type props = {
  path: string,
  loginState: {}
}

function Login(props: props) {

  function handleSubmit() {
    console.log(password);
    checkLogin(password)
              .then(success => {
                if(success)
                  window.location.href = '/'
              })
  }

  const [password, setPassword] = useState('');
  return (
    <div>
      <h1>Login</h1>
      <input 
        type="text" 
        value={password}
        onChange={e => setPassword(e.currentTarget.value)}
      >
      </input>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;