import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import NowPlayingMovies from './NowPlayingMovies';
import MovieMini from './MovieMini';
import HeaderMini from './HeaderMini';

import { Container } from '@material-ui/core';

import { Element } from "react-scroll";

import { getMoviesInSearch } from '../actions/fetchActions';

import scrollTo from '../helpers/scrollTo';

const useStyles = makeStyles({
    home_root: {},
    home_container: {
        display: 'flex',
        justifyContent: 'center'
    },
    ListMoviesSearched: {
        paddingTop: '12px',
        minHeight: '350px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    searchBar: {
        marginTop: '50px',
        borderRadius: '10px',
        backgroundColor: 'rgb(20, 20, 24)',
        color: 'white',
        paddingLeft: '10px',
        height: '30px',
        width: '400px',
        fontSize: 'medium'
    }
});



const MovieSearch = (props) => {

    const classes = useStyles();

    const { resultMovies } = props

    const [typingTimeout, setTypingTimeout] = useState();
    const [inputSearchMovie, setInputSearchMovie] = useState('')


    const changeInputMovieHome = async (event) => {
        const query = event.target.value;
        setInputSearchMovie(query);
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const fetch = setTimeout(async () => {
            await props.getMoviesInSearch(query);
            scrollTo('ListMoviesSearched');
        }, 500);

        setTypingTimeout(fetch);
    };

    return (
        <div className={classes.home_root}>
            <HeaderMini />
            <NowPlayingMovies {...props} />
            <Container className={classes.home_container}>
                <input
                    className={classes.searchBar}
                    type='text'
                    placeholder={`Entrer le nom d'un film`}
                    value={inputSearchMovie}
                    onChange={changeInputMovieHome}
                />
            </Container>

            <Element name='ListMoviesSearched'>
                {(resultMovies && resultMovies.length !== 0) &&
                    <div className={classes.ListMoviesSearched}>
                        {resultMovies
                            .sort((a, b) => b.popularity - a.popularity)
                            .filter((_, i) => i < 20)
                            .map((element, i) =>
                                <MovieMini
                                    {...props}
                                    key={`movie-${i}`}
                                    movieDetails={element}
                                />
                            )
                        }
                    </div>
                }
            </Element>
        </div>
    );
};


const mapStateToProps = state => ({
    resultMovies: state.fetchMovies.listMovies,
});


export default connect(mapStateToProps, { getMoviesInSearch })(MovieSearch)

