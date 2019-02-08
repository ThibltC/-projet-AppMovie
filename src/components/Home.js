import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Element } from "react-scroll";

import ListMovies from './ListMovies';
import Header from './Header';

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
            this.props.getMoviesInHome(this.state.inputSearchMovieHome);
            scrollTo('ListMoviesHomeBlock')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.redirection(true)
    }

    getIdMovie = (idMovie) => {
        this.setState({
            idMovie,
        })
    }

    render() {
        const { resultMovies, moviesAreLoaded, redirect } = this.props
        const { inputSearchMovieHome } = this.state

        if (redirect) return <Redirect to={`/movie${resultMovies[0].id}`} />
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
    redirect: state.redirection.redirect
});

export default connect(mapStateToProps, { getMoviesInHome, redirection })(Home)
