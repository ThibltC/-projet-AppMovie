import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Movie from './components/Movie';
import Actor from './components/Actor';
import Search from './components/Search';

import './App.css';


class App extends Component {

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/movie:id(\d+)' component={Movie}/>
          <Route exact path='/actor:id(\d+)' component={Actor}/>
          <Route path='/search' component={Search} />
        </Switch>
      </div>

    );
  }
}

export default App;
