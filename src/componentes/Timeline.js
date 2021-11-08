import React, { Component } from 'react';
import FotoItem from './FotoItem';
import PubSub from "pubsub-js"


export default class Timeline extends Component {
    
    constructor(){
      super();
      this.state = {fotos:[]};
    }

    componentWillMount(){
      PubSub.subscribe('timeline',(topico, fotos) => {
          this.setState({fotos});
      })
    }


    componentDidMount(){
      this.carregaFotos(this.props);
    }

    carregaFotos(props){
      let urlPerfil;
      if(props.login === undefined){
        urlPerfil = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`
      } else {
        urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/${props.login}`
      }
      fetch(urlPerfil)
      .then(response => response.json())
      .then(fotos =>{
        this.setState({fotos:fotos});
      });
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.login !== undefined){
        this.carregaFotos(nextProps);
      }
    }

    render(){
        return (
        <div className="fotos container">
         {
           this.state.fotos.map(foto => <FotoItem foto={foto}/>)
         }
        </div>            
        );
    }
}