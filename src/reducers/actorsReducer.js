import { GET_ACTOR_INFO, GET_FILMOGRAPHY, GET_TVGRAPHY } from '../actions/types';

const initialState = {
    isLoadingFilmo: false,
    actorDetails: undefined,
    filmo: undefined,
    tv: undefined
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ACTOR_INFO:
            return {
                ...state,
                actorDetails: action.details,
            }
            case GET_FILMOGRAPHY:
            return {
                ...state,
                filmo: action.filmo,
                isLoadingFilmo: true
            }
            case GET_TVGRAPHY:
            return {
                ...state,
                tv: action.tv,
            }
        default: return state
    }
}