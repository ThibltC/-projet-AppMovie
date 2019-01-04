import { combineReducers } from 'redux';
import fetchReducer from './fetchReducer';
// import reducer2 from './reducer2';
// import reducer3 from './reducer3';
// import reducer4 from './reducer4';
// import reducer5 from './reducer5';
// import reducer6 from './reducer6';


export default combineReducers({
  fetchMovies: fetchReducer,
//   state2: reducer2,
//   state3: reducer3,
//   state4: reducer4,
//   state5: reducer5,
//   state6: reducer6,
});