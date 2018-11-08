import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ListMovies from '../ListMovies/ListMovies';
import SearchBar from '../SearchBar/SearchBar';
import Header from '../Header/Header';
import Search from '../Search';

import './Home.css';


class Home extends Component {

    state = {
        inputSearchMovie: '',
        result: [],
        isLoaded: false,
        idMovie: undefined,
        changeRoute: false,
        randomMoviePoster: undefined,
    }

    changeInput = async (event) => {
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
                    result: data.results,
                    isLoaded: true,
                });
            });
    }

    getIdMovie = (idMovie) => {
        this.setState({
            idMovie: idMovie,
            changeRoute: true
        })
    }


    render() {
        return (
            <div className='Home' >
            <Search />
                <Header />
                <SearchBar
                    inputSearchMovie={this.state.inputSearchMovie}
                    changeInput={this.changeInput}
                />
                {(this.state.isLoaded && this.state.inputSearchMovie.length !== 0) &&
                    <div className="response">
                        {this.state.result
                            .filter((_, i) => i < 15)
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
