import { REDIRECTION, REDIRECTION_DONE } from '../actions/types';

const initialState = {
    redirect: false,
    path: '/'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REDIRECTION:
            return {
                ...state,
                redirect: action.redirect,
                path: action.path
            }
            case REDIRECTION_DONE:
            return {
                state: initialState
            }
        default: return state
    }
}