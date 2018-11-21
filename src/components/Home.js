import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import ListMovies from './ListMovies';
import SearchBar from './SearchBar';
import Header from './Header';

import './Home.css';


class Home extends Component {

    state = {
        inputSearchMovie: '',
        resultMovies: [],
        isLoaded: false,
        idMovie: undefined,
        randomMoviePoster: undefined,
        redirect: false
    }

    changeInputMovie = async (event) => {
        await this.setState({
            inputSearchMovie: event.target.value
        })
        if (this.state.inputSearchMovie) {
            this.getMovies();
        }
    }


    getMovies = () => {
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${this.state.inputSearchMovie}&page=1&region=FR&language=fr-FR`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    resultMovies: data.results,
                    isLoaded: true,
                });
            });

    }

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
        if (this.state.redirect) return <Redirect to={`/movie${this.state.resultMovies[0].id}`} />
        return (
            <div className='Home'>
                <Header />

                <form autoComplete='off' className='displaySearch' onSubmit={this.handleSubmit}>


                    <SearchBar
                        inputSearch={this.state.inputSearchMovie}
                        changeInput={this.changeInputMovie}
                        handleSubmit={this.handleSubmit}
                    />
                    <Link to='/search'>
                        <button >Recherche avancée</button>
                    </Link>
                </form>
                {(this.state.isLoaded && this.state.inputSearchMovie.length !== 0) &&
                    <div className="response">
                        {this.state.resultMovies
                            .sort((a, b) => b.popularity - a.popularity)
                            .filter((_, i) => i < 6)
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

export default Home
