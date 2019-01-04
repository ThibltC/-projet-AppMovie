import { REDIRECTION } from '../actions/types';

export const redirection = (bool) => (dispatch) => {
    dispatch({
        type: REDIRECTION,
        redirect: bool
    })
}