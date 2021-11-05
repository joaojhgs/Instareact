import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import reportWebVitals from './reportWebVitals';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';

function verificaAutenticacao(){
  if(localStorage.getItem('auth-token') != null){
    return true;
  }
}

function logout(){
    localStorage.removeItem('auth-token');
    return true;
}


ReactDOM.render(
   <BrowserRouter>
    <div id="main">
          <Switch>
              <Route exact path="/" component={Login} render={() => (
                    verificaAutenticacao() ? (
                      <Redirect to="/timeline"/>
                    ) : (
                      <Redirect to="/"/>
                    )
                )}/>
  
              <Route path="/timeline" render={() => (
                    verificaAutenticacao() ? (
                        <App />
                    ) : (
                        <Redirect to="/?msg=Voce precisa estar logado para acessar esta pagina!"/>
                    )
                )}/>

              <Route path="/logout" render={() => (
                    logout() ? (
                      <Redirect to="/?msg=Logout realizado com sucesso!"/>
                    ) : (
                        <Redirect to="/?msg=Logout realizado com sucesso!"/>

                    )
                )}/>

          </Switch>
    </div>
   </BrowserRouter>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
