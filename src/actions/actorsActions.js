import { GET_ACTOR_INFO, GET_FILMOGRAPHY, GET_TVGRAPHY} from './types';

const api_key = "91fe0a0af86fd4b9a59892545496d3b4"

export const getActorInfos = (id) => (dispatch) => {
    fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&language=fr-FR`)
        .then(data => data.json())
        .then(data => {
            dispatch({
                type: GET_ACTOR_INFO,
                details: data,
            })
        })
}

export const getFilmography = (id) => (dispatch) => {
    fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}&language=fr-FR`)
        .then(data => data.json())
        .then(data => {
            dispatch({
                type: GET_FILMOGRAPHY,
                filmo: data,
                isLoadingFilmo: true,
            })
        })
}

export const getTvgraphy = (id) => (dispatch) => {
    fetch(`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${api_key}&language=fr-FR`)
        .then(data => data.json())
        .then(data => {
            dispatch({
                type: GET_TVGRAPHY,
                tv: data,
            })
        })
}