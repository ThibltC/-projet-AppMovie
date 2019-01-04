import { FETCH_MOVIE, FETCH_HEADER } from '../actions/types';

const initialState = {
  listMovies: [],
  areLoaded: false,
  randomMovie: undefined,
  imageLoaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return {
        ...state,
        listMovies: action.listMoviesInHome,
        areLoaded: action.areLoaded
      };
      case FETCH_HEADER:
      return {
        ...state,
        randomMovie: action.randomMovie,
        imageLoaded: action.imageLoaded
      };
    default: return state
  }
}
