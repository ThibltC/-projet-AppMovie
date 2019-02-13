import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';
import redirectionReducer from './redirectionReducer'
import moviesReducer from './moviesReducer';
import searchReducer from './searchReducer'


export default combineReducers({
  fetchMovies: fetchReducer,
  redirection: redirectionReducer,
  movieData: moviesReducer,
  LFParticularMovie: searchReducer
//   state: reducer,

});