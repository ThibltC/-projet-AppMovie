import { GET_MOVIE_INFO, GET_CREDITS_INFO, CLEAN_INFOS_MOVIE } from '../actions/types';

const initialState = {
    isLoadingCredits: false,
    movieDetails: undefined,
    casting: undefined,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MOVIE_INFO:
            return {
                ...state,
                movieDetails: action.details,
            };
            case GET_CREDITS_INFO:
            return {
                ...state,
                casting: action.casting,
                isLoadingCredits: true
            };
            case CLEAN_INFOS_MOVIE:
            return {
                ...state,
                state: initialState
            }
        default: return state
    }
}