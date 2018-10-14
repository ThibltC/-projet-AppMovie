import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Response from './Response';
import './AppMovie.css'

class AppMovieBis extends Component {

    state = {
        result: []
    }

    getMovie = async (e) => {
        e.preventDefault()
        const movieRequest = e.target.elements.movieInput.value
        const api_key = "9e5fa31e"
        const fetchAPI = await fetch(`http://www.omdbapi.com/?apikey=${api_key}&`)
        const toJson = await fetchAPI.json()
        console.log(toJson)

        this.setState({
            result: toJson.results
        })
    }



    render() {
        return (
            <div>
                <div>
                    <SearchBar search={this.getMovie} />
                </div>
                <div className="row">
                    {this.state.result.map((resultElement) => <Response resultKey={resultElement.poster_path} />)}
                </div>
            </div>
        );
    }
}

export default AppMovieBis;