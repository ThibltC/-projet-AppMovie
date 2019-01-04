import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ListMovies from './ListMovies';
import Header from './Header';

import { getMoviesInHome } from '../actions/fetchActions'
import { redirection } from '../actions/redirectionActions'

import './Home.css';



class Home extends Component {

    state = {
        inputSearchMovie: '',
        idMovie: undefined,
    }

    changeInputMovie = async (event) => {
        await this.setState({
            inputSearchMovie: event.target.value
        })
        if (this.state.inputSearchMovie) {
            this.props.getMoviesInHome(this.state.inputSearchMovie);
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
        const { resultMovies, moviesAreLoaded, redirect} = this.props
        if (redirect) return <Redirect to={`/movie${resultMovies[0].id}`} />
        return (
            <div className='HomeComponent' >
                <Header />
                <div className='Home'>
                    <div className='SearchBar'>
                        <form autoComplete='off' className='displaySearch' onSubmit={this.handleSubmit}>
                            <input
                                className='SearchBar'
                                type='text'
                                placeholder={`Entrer le nom d'un film`}
                                value={this.state.inputSearch}
                                onChange={this.changeInputMovie}
                            />
                        </form>
                    </div>
                    <Link to='/search'>
                        <button >Recherche avancée</button>
                    </Link>
                </div>
                {(moviesAreLoaded && this.state.inputSearchMovie.length !== 0) &&
                    <div className="response">
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
