import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home/Home';
import Movie from './Movie/Movie';
import Header from './Header/Header';
import Actor from './Actor/Actor';

import './App.css';


class App extends Component {

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/movie:id(\d+)' component={Movie}/>
          {/* <Route exact path='/actor:id(\d+)' component={Actor}/> */}
        </Switch>
      </div>

    );
  }
}

export default App;
