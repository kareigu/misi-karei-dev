import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import logo from './temp.gif';
import './App.css';

import Quotes from './components/quotes';
import Niilo from './components/niilo';
import Home from './components/home';
import Debug from './components/debug';
import Login from './components/Login';
import Tools from './components/Tools';
import Misc from './components/misc';

import NavButton from './components/NavButtons';

import checkLogin from './utils/Login';

function App() {
  const token = (token: String | null) => {
    if(token)
      return token;
    else
      return '';
  }

  React.useEffect(() => {
    checkLogin(token(localStorage.getItem('token')))
            .then(val => setLoggedIn(val));
  })
  
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <nav>
            <ul>
              <NavButton to="/" text="Home" />
              <NavButton to="quotes" text="Quotes" />
              <NavButton to="niilo" text="Niilo" />
              <NavButton to="misc" text="Misc" />
            </ul>
          </nav>

          <nav className="adminPanels">
            { loggedIn &&
              <NavButton to="tools" text="tools" />
            }
            <NavButton 
              to={loggedIn ? 'signout' : 'login'} 
              text={loggedIn ? 'Sign out' : 'Login'} 
            />
          </nav>
        </header>

        <Switch>

          <Route path="/quotes">
            <Quotes />
          </Route>

          <Route path="/niilo">
            <Niilo />
          </Route>

          <Route path="/debug">
            <Debug />
          </Route>

          <Route path="/login">
            <Login 
              loginState={setLoggedIn}
              path="login"
            />
          </Route>

          <Route path="/signout">
            <Login 
              loginState={setLoggedIn}
              path="signout"
            />
          </Route>

          <Route path="/tools">
            <Tools />
          </Route>

          <Route path="/misc">
            <Misc />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
