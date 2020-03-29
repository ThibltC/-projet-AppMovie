import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';


import Header from './Header';

const useStyles = makeStyles({
    home_root: {},
    home_container: {
        display: 'flex',
        justifyContent: 'center'
    }
});



const Home = () => {

    const classes = useStyles();
    return (
        <div className={classes.home_root}>
            <Header />
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
            </div>
        </div>
    );
};

export default Home;
