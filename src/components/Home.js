import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMoviesInHome } from '../actions/fetchActions'


import ListMovies from './ListMovies';
import Header from './Header';

import './Home.css';



class Home extends Component {

    state = {
        inputSearchMovie: '',
        idMovie: undefined,
        randomMoviePoster: undefined,
        redirect: false
    }

    changeInputMovie = async (event) => {
        await this.setState({
            inputSearchMovie: event.target.value
        })
        if (this.state.inputSearchMovie) {
            this.props.getMoviesInHome(this.state.inputSearchMovie);
        }
    }

    // getMovies = () => {
    //     const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
    //     fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${this.state.inputSearchMovie}&page=1&region=FR&language=fr-FR`)
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({
    //                 resultMovies: data.results,
    //                 isLoaded: true,
    //             });
    //         });

    // }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            redirect: true
        })
    }

    getIdMovie = (idMovie) => {
        this.setState({
            idMovie,
        })
    }

    render() {
        const { resultMovies, moviesAreLoaded } = this.props
        if (this.state.redirect) return <Redirect to={`/movie${resultMovies[0].id}`} />
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
    moviesAreLoaded: state.fetchMovies.areLoaded

});

export default connect(mapStateToProps, { getMoviesInHome })(Home)
