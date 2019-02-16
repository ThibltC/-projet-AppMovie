import { SEARCH_PARTICULAR_MOVIES } from './types';

const api_key = "91fe0a0af86fd4b9a59892545496d3b4"

export const searchMoviesWithQuerys = (runTimeMax, idsGenreSelected, yearMin, yearMax, originalLanguage, numPage) => (dispatch) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=fr-FR&sort_by=popularity.desc&primary_release_date.gte=${yearMin}-01-01&primary_release_date.lte=${yearMax}-12-31&with_genres=${idsGenreSelected}&with_runtime.lte=${runTimeMax}&with_original_language=${originalLanguage}&page=${numPage}`)
        .then(data => data.json())
        .then(data => {
            dispatch({
                type: SEARCH_PARTICULAR_MOVIES,
                moviesFound: data.results,
                numPages: data.total_pages
            })
        })
}