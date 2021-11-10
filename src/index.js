import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import './css/bootstrap.css';
import App from './App';
import Login from './componentes/Login';
import reportWebVitals from './reportWebVitals';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {timeline} from './reducers/timeline';
import {notificacao} from './reducers/header';

const reducers = combineReducers({timeline,notificacao});
const store = createStore(reducers,applyMiddleware(thunkMiddleware));


function verificaAutenticacao(nextState){
  console.log(nextState);

  if(localStorage.getItem('auth-token') != null){
    return true;
  }
}

function logout(){
    localStorage.removeItem('auth-token');
    localStorage.setItem('error', 'A sessao foi finalizada com sucesso!');
    return true;
}


ReactDOM.render(
   <BrowserRouter>
    <div id="main">
          <Switch>
              <Route exact path="/" render={() => (
                    verificaAutenticacao() ? (
                      <Redirect to="/timeline/"/>
                    ) : (
                      <Login/>
                    )
                )}/>
  
              <Route exact path="/timeline" render={() => (
                    verificaAutenticacao() ? (
                        <App />
                    ) : (
                        localStorage.setItem('error', 'Você precisa estar logado para acessar esta pagina!'),
                        <Redirect to="/"/>
                    )
                )}/>
          
              <Route path="/timeline/:login" component={App}/>

              <Route path="/logout" render={() => (
                    logout() ? (
                      <Redirect to="/"/>
                    ) : (
                        <Redirect to="/"/>

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