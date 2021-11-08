import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

export default class Login extends Component {
    
    constructor(props){
        super(props);
        console.log(this.props)

        if(localStorage.getItem('error') != null){
            this.state = {msg:localStorage.getItem('error'), redirect:null}
        } else {
            this.state = {msg:'', redirect:null}
        }
        
    }


    envia(event){
        event.preventDefault();
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({login:this.login.value,senha:this.senha.value}),
            headers: new Headers({
                'Content-type':'application/json'
            })
        }
        fetch('https://instalura-api.herokuapp.com/api/public/login', requestInfo)
        .then(response =>{
            if(response.ok){
                return response.text();
            } else{
                throw new Error('Nao foi possivel realizar o login');
            }
        })
        .then(token => {
            localStorage.setItem('auth-token', token);
            localStorage.removeItem('error');
            this.setState({redirect:"/timeline"});
        })
        .catch(error => {
            this.setState({msg:error.message});
        })
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
            
        }
        return(
            <div className="login-box">
                <form onSubmit={this.envia.bind(this)}>
                    <center><h1 className="header-logo">Instareact</h1></center>
                    <span>{this.state.msg}</span>
                    <input type="text" placeholder="Usuario" ref={(input) => this.login = input}/>
                    <input type="password" placeholder="Senha" ref={(input) => this.senha = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        )
    }
}