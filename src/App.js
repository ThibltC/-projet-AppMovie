import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Movie from './components/Movie';
import Actor from './components/Actor';
import Search from './components/Search';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage'

import './App.css';


const App = () => {

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/movie:id(\d+)' component={Movie} />
        <Route exact path='/actor:id(\d+)' component={Actor} />
        <Route exact path='/search' component={Search} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
