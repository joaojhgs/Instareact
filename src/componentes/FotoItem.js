import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PubSub from "pubsub-js"

class FotoAtualizacoes extends Component {

    constructor(props){
      super(props);
      this.state = {likeada: this.props.foto.likeada}
    }


    like(event){
      event.preventDefault();

      fetch(`https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,{method:'POST'})
      .then(response => {
        if(response.ok){
          return response.json();
        } else {
          //throw new Error("Nao foi possivel realizar o like");
        }
      })
      .then(liker => {
        this.setState({likeada : !this.state.likeada});
        PubSub.publish('atualiza-likers',{fotoId:this.props.foto.id, liker})

      })
    }

    comenta(event){
      event.preventDefault();

      const requestInfo = {
        method:'POST',
        body:JSON.stringify({texto:this.comentario.value}),
        headers: new Headers({
          'Content-type':'application/json'
        })
      };

      fetch(`https://instalura-api.herokuapp.com/api/fotos/${this.props.foto.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,requestInfo)
      .then(response => {
        if(response.ok){
          return response.json();
        } else {
          //throw new Error("Nao foi possivel comentar");
        }
      })
      .then(novoComentario => {
        PubSub.publish('novos-comentarios', {fotoId:this.props.foto.id,novoComentario});
      })
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
              <a onClick={this.like.bind(this)} className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
              <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>

            </section>            
        );
    }
}

class FotoInfo extends Component {

  constructor(props){
    super(props);
    this.state = {likers:this.props.foto.likers, comentarios:this.props.foto.comentarios}
    //console.log(this.props.foto.likers);
  }

  componentWillMount(){
    PubSub.subscribe('atualiza-likers',(topico,infoLiker) =>{
        if(this.props.foto.id === infoLiker.fotoId){
          const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login);
          if(possivelLiker === undefined){
            console.log(this.state.likers)
            //const novosLikers = this.state.likers.concat(infoLiker.liker);
            //this.setState({likers:novosLikers}) //API sem suporte, causa erro
          }

        }
    });

    PubSub.subscribe('novos-comentarios',(topico,infoComentario) =>{
      if(this.props.foto.id === infoComentario.fotoId){
        const novosComentarios = this.state.comentarios.concat(infoComentario.novoComentario);
        this.setState({comentarios:novosComentarios});
      }
    });
  }
    render(){
        return (
            <div className="foto-info">
              <div className="foto-info-likes">
                {
                  this.state.likers.map(liker => {
                    return (<Link to={`/timeline/${liker.login}`}>{liker.login}</Link>)
                  })
                }
              </div>

              <p className="foto-info-legenda">
                <Link to={`/timeline/${this.props.foto.loginUsuario}`} className="foto-info-autor">{this.props.foto.loginUsuario} </Link>
                {this.props.foto.comentario}
              </p>

              <ul className="foto-info-comentarios">
                {
                  this.state.comentarios.map(comentario => {
                    return(
                      <li className="comentario">
                        <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login}</Link>
                          {comentario.texto}
                      </li>
                    );
                  })
                }
              </ul>
            </div>            
        );
    }
}

class FotoHeader extends Component {
    render(){
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src={this.props.foto.urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                    {this.props.foto.loginUsuario}
                  </Link>  
                </figcaption>
              </figure>
              <time className="foto-data">{this.props.foto.horario}</time>
            </header>            
        );
    }
}

export default class FotoItem extends Component {
    render(){
        return (
          <div className="foto">
            <FotoHeader foto={this.props.foto}/>
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} id={this.props.foto.fotoID}/>
                <FotoInfo foto={this.props.foto}/>
            <FotoAtualizacoes foto={this.props.foto}/>
          </div>            
        );
    }
}