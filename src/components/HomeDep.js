import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Element } from "react-scroll";

import ListMovies from './ListMovies';
import Header from './Header';
import Button from './Tools/Button';

import { getMoviesInHome } from '../actions/fetchActions'
import { redirection } from '../actions/redirectionActions'
import scrollTo from '../helpers/scrollTo'

import './Home.css';


class Home extends Component {

    state = {
        inputSearchMovieHome: '',
        idMovie: undefined,
    }

    changeInputMovieHome = async (e) => {
        await this.setState({
            inputSearchMovieHome: e.target.value
        })
        if (this.state.inputSearchMovieHome) {
            await this.props.getMoviesInHome(this.state.inputSearchMovieHome);
            scrollTo('ListMoviesHomeBlock')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.redirection(true, `/movie${this.props.resultMovies[0].id}`)
    }

    getIdMovie = (idMovie) => {
        this.setState({
            idMovie,
        })
    }

    render() {
        const { resultMovies, moviesAreLoaded, redirect, path } = this.props
        const { inputSearchMovieHome } = this.state

        if (redirect) return <Redirect to={path} />
        return (
            <div className='Home' >
                <Header />

                <div className='HomeBis'>
                    <div className='SearchBar'>
                        <form className='displaySearch' onSubmit={this.handleSubmit} autoComplete='off' >
                            <input
                                type='text'
                                placeholder={`Entrer le nom d'un film`}
                                value={inputSearchMovieHome}
                                onChange={this.changeInputMovieHome}
                            />
                        </form>
                    </div>
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

                {(moviesAreLoaded && inputSearchMovieHome.length !== 0) &&
                    <Element name='ListMoviesHomeBlock'>
                        <div className="ListMoviesHomeBlock">
                            {resultMovies
                                .sort((a, b) => b.popularity - a.popularity)
                                .filter((_, i) => i < 20)
                                .map((element, i) =>
                                    <Link to={`/movie${element.id}`} key={`movie-${i}`}>
                                        <ListMovies
                                            movieDetails={element}
                                            getIdMovie={this.getIdMovie}
                                        />
                                    </Link>
                                )
                            }
                        </div>
                    </Element>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    resultMovies: state.fetchMovies.listMovies,
    moviesAreLoaded: state.fetchMovies.areLoaded,
    redirect: state.redirection.redirect,
    path: state.redirection.path
});

export default connect(mapStateToProps, { getMoviesInHome, redirection })(Home)
