import { REDIRECTION, REDIRECTION_DONE } from '../actions/types';

export const redirection = (bool, path) => (dispatch) => {
    dispatch({
        type: REDIRECTION,
        redirect: bool,
        path
    })
}

export const redirectionDone = () => (dispatch) => {
    dispatch({
        type: REDIRECTION_DONE
    })
}