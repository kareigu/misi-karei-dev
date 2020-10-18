import React from 'react';
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
import Debug from './components/debug'

import NavButton from './components/NavButtons';

function App() {
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
            </ul>
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
