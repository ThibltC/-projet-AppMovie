import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import MoviePage from './components/MoviePage';
import MovieSearch from './components/MovieSearch';
import Actor from './components/Actor';
import Search from './components/Search';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage';
import Header from './components/Header';
import Snackbar from './components/Snackbar';

import './App.css';
import HeaderMini from './components/HeaderMini';

import CombinedContext from './contexts/combineContext';
import TranslationContext from './contexts/translationContext';

import useCombinedReducers from './reducers/combineReducer';
import useTranslation from './hooks/useTranslation';


const App = () => {

  const [state, dispatch] = useCombinedReducers();
  const [t, setLocale, locale] = useTranslation();

  const path = window.location.pathname;
  return (
    <CombinedContext.Provider value={[state, dispatch]} >
      <TranslationContext.Provider value={[t, setLocale, locale]} >
        <div className='App'>
          {path === '/' ? <Header /> : <HeaderMini />}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/movie' component={MovieSearch} />
            <Route exact path='/movie/:id(\d+)' component={MoviePage} />
            <Route exact path='/actor/:id(\d+)' component={Actor} />
            <Route exact path='/search' component={Search} />
            <Route component={NotFoundPage} />
          </Switch>
          <Snackbar />
          <Footer />
        </div>
      </TranslationContext.Provider>
    </CombinedContext.Provider>
  );
}

export default App;
