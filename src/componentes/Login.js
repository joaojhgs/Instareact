import React, { Component } from 'react';

export default class Login extends Component {
    render(){
        return(
            <div className="login-box">
                <form>
                    <center><h1>Login</h1></center>
                    <input type="text"/>
                    <input type="password"/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        )
    }
}