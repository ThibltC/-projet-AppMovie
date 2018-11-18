import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home/Home';
import Movie from './Movie/Movie';
import Actor from './Actor/Actor';
import Search from './Search/Search';

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
