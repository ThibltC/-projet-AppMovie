import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';
import redirectionReducer from './redirectionReducer';
import moviesReducer from './moviesReducer';
import searchReducer from './searchReducer';
import actorsReducer from './actorsReducer'


export default combineReducers({
  fetchMovies: fetchReducer,
  redirection: redirectionReducer,
  movieData: moviesReducer,
  LFParticularMovie: searchReducer,
  actorData: actorsReducer
//   state: reducer,

});