import React, { Component } from 'react'

import './NotFoundPage.css'

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className='NotFoundPage'>
        <p>Erreur 404 : Page introuvable. Retour à <a href='/'>l'accueil</a></p>     
      </div>
    )
  }
}
