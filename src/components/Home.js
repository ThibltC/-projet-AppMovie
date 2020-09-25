import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import Header from './Header';
import Button from './Tools/Button';
import NowPlayingMovies from './NowPlayingMovies'
import MostPopularActors from './MostPopularActors'
import AppBar from './AppBar';


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


const Home = () => {

    const classes = useStyles();


    return (
        <div className={classes.home_root} >
            <NowPlayingMovies />
            <MostPopularActors />
            <div className={classes.home_container}>
                <Link to='/search'>
                    <button >Recherche avancée</button>
                </Link>
                <Link to='/actor'>
                    <button >Rechercher un acteur</button>
                </Link>
                <Link to='/movie'>
                    <button >Rechercher un film</button>
                </Link>
                <Button label='oklm' />
            </div>
        </div>
    );
};

export default Home;
