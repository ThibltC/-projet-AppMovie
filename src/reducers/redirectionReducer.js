import { REDIRECTION } from '../actions/types';

const initialState = {
    redirect: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REDIRECTION:
            return {
                ...state,
                redirect: action.redirect
            };
        default: return state
    }
}