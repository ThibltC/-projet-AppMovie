import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppMovie from './AppMovie';

class App extends Component {

  render() {
    return (

      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <AppMovie />
      </div>

    );
  }
}

export default App;
