import React, { useState, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import logo from './temp.gif';
import './App.css';


import NavButton from './components/NavButtons';
import checkLogin from './utils/Login';

const Quotes = React.lazy(() => import('./components/quotes'));
const Niilo = React.lazy(() => import('./components/niilo'));
const Home = React.lazy(() => import('./components/home'));
const Debug = React.lazy(() => import('./components/debug'));
const Login = React.lazy(() => import('./components/Login'));
const Tools = React.lazy(() => import('./components/Tools'));
const Misc = React.lazy(() => import('./components/misc'));

function App() {
  const renderLoad = (<h2>Loading...</h2>);

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
                loginState={setLoggedIn}
                path="login"
              />
            </Suspense>
          </Route>

          <Route path="/signout">
            <Suspense fallback={renderLoad}>
              <Login 
                loginState={setLoggedIn}
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
    </Router>
  );
}

export default App;
