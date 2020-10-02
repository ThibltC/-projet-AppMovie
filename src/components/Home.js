import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import Button from './Tools/Button';
import NowPlayingMovies from './NowPlayingMovies';
import MostPopularActors from './MostPopularActors';
import ImageFrameRow from './ImageFrameRow';
import MovieSearch from './MovieSearch';
import HeaderMovie from './HeaderMovie';

import TranslationContext from '../contexts/translationContext';



const useStyles = makeStyles(theme => ({
    home_root: {},
    home_container: {
        display: 'flex',
        justifyContent: 'center',
        '@media (max-width:780px)': {
            flexDirection: 'column',
            alignItems: 'center'
        },
    }
}));
const api_key = process.env.REACT_APP_API_KEY;


const Home = () => {

    const classes = useStyles();

    const [t] = useContext(TranslationContext);

    const urlPopularPersons = `https://api.themoviedb.org/3/person/popular?api_key=${api_key}&language=fr-FR`;
    const urlPlayinMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=fr-FR`;

    const labelsActor = {
        path: 'profile_path',
        label: 'name',
        type: 'actor'
    };
    const labelsMovie = {
        path: 'poster_path',
        label: 'label',
        type: 'movie'
    };


    return (
        <div className={classes.home_root} >
            <HeaderMovie />
            <h2>{t('title', 'movie_now_playing')}</h2>
            <ImageFrameRow url={urlPlayinMovies} labels={labelsMovie} />
            <h2>{t('title', 'person_popular')}</h2>
            <ImageFrameRow url={urlPopularPersons} labels={labelsActor} />
        </div>
    );
};

export default Home;
