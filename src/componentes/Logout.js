import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class Logout extends Component {
    
    componentDidMount(){
        localStorage.removeItem('auth-token');
        <Redirect to="/?msg=A sessao foi finalizada com sucesso!"/>
    }
    
    render(){
        return null;
    }
}