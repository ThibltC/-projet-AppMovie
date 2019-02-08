import { GET_MOVIE_INFO, GET_CREDITS_INFO, CLEAN_INFOS_MOVIE } from './types';

const api_key = "91fe0a0af86fd4b9a59892545496d3b4"

export const getMovieInfos = (id) => (dispatch) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=fr-FR`)
        .then(data => data.json())
        .then(data => {
            dispatch({
                type: GET_MOVIE_INFO,
                details: data,
            })
        })
}

export const getMovieCredits = (id) => (dispatch) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=fr-FR`)
        .then(data => data.json())
        .then(data => {
            dispatch({
                type: GET_CREDITS_INFO,
                casting: data.cast,
                isLoadingCredits: true,
            })
        })
}

export const cleanMovieInfos = () => (dispatch) => {
    dispatch({
        type: CLEAN_INFOS_MOVIE,
        isLoadingCredits: false,
        details: undefined,
        casting: undefined
    })
}