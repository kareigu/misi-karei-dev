import React, { useState, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import logo from './temp.gif';
import './App.css';

import paths from './utils/paths.json';


import NavButton from './components/NavButtons';
import checkLogin from './utils/Login';

const Quotes = React.lazy(() => import('./components/quotes'));
const Niilo = React.lazy(() => import('./components/niilo'));
const Home = React.lazy(() => import('./components/home'));
const Debug = React.lazy(() => import('./components/debug'));
const Login = React.lazy(() => import('./components/Login'));
const Tools = React.lazy(() => import('./components/Tools'));
const Misc = React.lazy(() => import('./components/misc'));

const LoginURL = process.env.NODE_ENV === 'development' ? paths.devOAuth : paths.productionOAuth;

function App() {
  const renderLoad = (<h2 style={{color: 'white'}}>Loading...</h2>);

  useEffect(() => {
    checkLogin()
      .then(res => {
        setPermissionLevel(res.permission);
        setLoggedIn(res.logged);
      })
  }, [])


  const [permissionLevel, setPermissionLevel] = useState(0);
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
            { permissionLevel >= 4 &&
              <NavButton to="tools" text="tools" />
            }

            { !loggedIn &&
              <a href={LoginURL}>
                <NavButton text="login" />
              </a>
            }

            { loggedIn &&
              <NavButton to="signout" text="sign out" />
            }
          </nav>
        </header>

        <Switch>

          <Route path="/quotes">
            <Suspense fallback={renderLoad}>
              <Quotes permLevel={permissionLevel} />
            </Suspense>
          </Route>

          <Route path="/niilo">
            <Suspense fallback={renderLoad}>
              <Niilo permLevel={permissionLevel} />
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
              <Tools permLevel={permissionLevel} />
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
    </Router>
  );
}

export default App;
