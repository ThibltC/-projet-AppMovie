import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import ListMovies from './ListMovies/ListMovies';
import SearchBar from './SearchBar/SearchBar';

import './Home.css';


class Home extends Component {

    state = {
        inputSearchMovie: '',
        result: [],
        isLoaded: false,
        idMovie: undefined,
        changeRoute: false,
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
        if (this.state.changeRoute)
            return <Redirect to={`/movie${this.state.idMovie}`} />
        return (
            <div className='AppMovie'>
                <p>Accueil</p>
                <SearchBar
                    inputSearchMovie={this.state.inputSearchMovie}
                    changeInput={this.changeInput}
                />
                {(this.state.isLoaded && this.state.inputSearchMovie.length !== 0) &&
                    <div className="response">
                        {this.state.result
                            .filter((_, i) => i < 15)
                            .map((element, i) =>
                                <ListMovies
                                    resultKey={element.poster_path}
                                    title={this.state.result[i].original_title}
                                    id={this.state.result[i].id}
                                    key={`list-${i}`}
                                    getIdMovie={this.getIdMovie}
                                />
                            )
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Home