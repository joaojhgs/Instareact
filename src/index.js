import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './componentes/Login';

import reportWebVitals from './reportWebVitals';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

ReactDOM.render(
   <BrowserRouter>
    <div id="main">
          <Switch>
              <Route exact path="/" component={Login}/>
  
              <Route path="/timeline" component={App}></Route>

          </Switch>
    </div>
   </BrowserRouter>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
