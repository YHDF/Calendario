import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import tick from './javascripts/eventListeners/three'
import App from '../src/App'


/*let deletecookie = () => {
  console.log('deleting')
  if(document.cookie === '')
    return ;
  else if(document.cookie.split('; ').find(row => row.startsWith('deleted=')) === undefined)
      document.cookie = 'session_id' +
       '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
      document.cookie = 'deleted=true';
}
deletecookie();*/

let deletecookie = (function() {
  var executed = false;
  return function() {
      if (!executed) {
          executed = true;
          document.cookie = 'session_id' +
       '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
      }
  };
})();

deletecookie();
tick();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
