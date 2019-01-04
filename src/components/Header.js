import React, { Component } from 'react';
import logo from './logo.svg';
import './Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMovieHeader } from '../actions/fetchActions'


class Header extends Component {

    componentWillMount = () => {
        this.props.getMovieHeader()
    }

    render() {
        const {randomMovie} = this.props
        return (
            <header className="Header">
                <img src={logo} className="Header-logo" alt="logo" />
                <h1>App Movies</h1>
                {this.props.moviesIsLoaded &&
                    <Link to={`/movie${randomMovie.id}`} >
                        <div className='randomHeaderStyle'>
                            <div className='filtreImage'></div>
                            <img src={`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`} alt={randomMovie.title} />
                        </div>
                    </Link>
                }
            </header>
        )
    }
}

const mapStateToProps = state => ({
    randomMovie: state.fetchMovies.randomMovie,
    moviesIsLoaded: state.fetchMovies.imageLoaded
});

export default connect(mapStateToProps, { getMovieHeader })(Header);