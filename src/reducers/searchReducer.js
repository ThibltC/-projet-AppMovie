import { SEARCH_PARTICULAR_MOVIES } from '../actions/types';

const initialState = {
    moviesFounded: [],
    numPagesTotal: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_PARTICULAR_MOVIES:
            return {
                ...state,
                moviesFounded: action.moviesFound,
                numPagesTotal: action.numPages
            }
        default: return state
    }
}