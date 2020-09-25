import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getMovieHeader } from '../actions/fetchActions'

import logo from '../pink_donut_-_2_-512.png';

import './Header.css';


class Header extends Component {

    componentDidMount = () => {
        this.props.getMovieHeader();
    };


    render() {
        const { randomMovie, getMovieHeader, moviesIsLoaded } = this.props;

        const bg_image = randomMovie && (randomMovie.backdrop_path ? randomMovie.backdrop_path : randomMovie.poster_path);

        return (
            <header className="Header">
                <img src={logo} className="Main-logo" alt="logo" onClick={getMovieHeader} />
                <h1>Donuts Movies</h1>
                {moviesIsLoaded &&
                    <Link to={`/movie/${randomMovie.id}`} >
                        <div className='randomHeaderStyle'>
                            <div className='filtreImage' />
                            <img src={`https://image.tmdb.org/t/p/original${bg_image}`} alt={randomMovie.title} />
                        </div>
                    </Link>
                }
            </header>
        );
    };
};

const mapStateToProps = state => ({
    randomMovie: state.fetchMovies.randomMovie,
    moviesIsLoaded: state.fetchMovies.headerImageIsLoaded
});

export default connect(mapStateToProps, { getMovieHeader })(Header);