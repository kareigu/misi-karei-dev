import React, { useState, Suspense, useEffect, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, NavLink
} from 'react-router-dom';
import { IconButton, Tooltip } from '@material-ui/core';
import { VpnKey } from '@material-ui/icons';
import logo from './temp.gif';
import { ReactComponent as LoadingIcon } from './utils/loading2.svg'
import './App.css';

import paths from './utils/paths.json';


import NavButton from './components/NavButtons';
import checkLogin from './utils/Login';
import UserContext, { TUserContextFormat, DefaultUser } from './utils/UserContext';
import UserMenu from './components/UserMenu';

const Quotes = React.lazy(() => import('./components/quotes'));
const Niilo = React.lazy(() => import('./components/niilo'));
const Home = React.lazy(() => import('./components/home'));
const Debug = React.lazy(() => import('./components/debug'));
const Login = React.lazy(() => import('./components/Login'));
const Tools = React.lazy(() => import('./components/Tools'));
const Misc = React.lazy(() => import('./components/misc'));

const LoginURL = process.env.NODE_ENV === 'development' ? paths.devOAuth : paths.productionOAuth;

function App() {
  const renderLoad = (<LoadingIcon style={{marginTop: '150px'}} />);

  useEffect(() => {
    checkLogin()
      .then(res => {
        setUser({
          permLevel: res.permLevel,
          username: res.username,
          avatar: res.avatar,
          logged: res.logged
        })
      })
  }, [])


  const [user, setUser] = useState<TUserContextFormat>(DefaultUser);

  const value = useMemo(() => ({user, setUser}), [user, setUser]);


  return (
    <Router>
      <UserContext.Provider value={value}>
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

            <nav className="userPanel">

              { !user.logged &&
                <Tooltip title="Login">
                  <IconButton
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                      color: 'white',
                      marginRight: '7px'
                    }}
                    onClick={() => window.location.href = LoginURL}
                  >
                    <VpnKey />
                  </IconButton>
                </Tooltip>
              }

              { user.logged &&
                <UserMenu />
              }

            </nav>
          </header>

          <Switch>

            <Route path="/quotes">
              <Suspense fallback={renderLoad}>
                <Quotes />
              </Suspense>
            </Route>

            <Route path="/niilo">
              <Suspense fallback={renderLoad}>
                <Niilo />
              </Suspense>
            </Route>

            <Route path="/debug">
              <Suspense fallback={renderLoad}>
                <Debug />
              </Suspense>
            </Route>

            <Route path="/login">
              <Suspense fallback={renderLoad}>
                <Login 
                  path="login"
                />
              </Suspense>
            </Route>

            <Route path="/signout">
              <Suspense fallback={renderLoad}>
                <Login 
                  path="signout"
                />
              </Suspense>
            </Route>

            <Route path="/tools">
              <Suspense fallback={renderLoad}>
                <Tools />
              </Suspense>
            </Route>

            <Route path="/misc">
              <Suspense fallback={renderLoad}>
                <Misc />
              </Suspense>
            </Route>

            <Route path="/">
              <Suspense fallback={renderLoad}>
                <Home />
              </Suspense>
            </Route>

          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
