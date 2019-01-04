import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';
import redirectionReducer from './redirectionReducer'
import moviesReducer from './moviesReducer';


export default combineReducers({
  fetchMovies: fetchReducer,
  redirection: redirectionReducer,
  movieData: moviesReducer
//   state: reducer,

});