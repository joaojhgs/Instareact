import React, { Component } from 'react';

export default class Login extends Component {
    
    constructor(props){
        super(props);
        console.log(this.props)
        
        if(props != null){
            this.state = {msg:this.props.location.search.replace(/%20/g, " ").replace("?msg=", "")}
        } else {
            this.state = {msg:''}
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
            this.props.history.push("/timeline")
        })
        .catch(error => {
            this.setState({msg:error.message})
        })
    }

    render(){
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