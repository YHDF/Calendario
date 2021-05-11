import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import tick from './javascripts/eventListeners/three'
import Navbar from './javascripts/components/Navbar'
import App from './javascripts/pages/Home'
import Connect from './javascripts/pages/Connect'


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
tick();
ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Navbar />
    <Switch>
      <Route path="/auth/connect">
        <Connect />
      </Route>
      <Route path="/">
        <App />
      </Route>
    </Switch>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
