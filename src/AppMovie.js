import React, { Component } from 'react';
import Response from './Response';
import './AppMovie.css'
// import SearchBar from './SearchBar';
import Movie from './Movie'

class AppMovie extends Component {


    state = {
        input: '',
        result: [],
        titlesAutoComp: [],
        isLoaded: false,
        title: '',
        info: undefined,
        whenInfoIsfills: false
    }


    getMovie = () => {
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-FR&query=${this.state.input}&page=1&region=FR&language=fr`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    result: data.results,
                    isLoaded: true,
                    whenInfoIsfills: false,
                });
            });
    }

    inputChange = async (event) => {
        await this.setState({
            input: event.target.value
        })
        if (this.state.input) {
            this.getMovie();
        }
    }

    getInfo = async (event) => {
        event.preventDefault()
        const query = event.target.elements.searchInput.value
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-FR&query=${query}&page=1&region=FR&language=fr`)
        const data = await response.json()
        this.setState({
            info: data.results,
            whenInfoIsfills: true,
            isLoaded: false
        });


    }

    legacy = async (title) => {
        await this.setState({ title })
        this.setState({ input: this.state.title })
    }


    render() {
        console.log(`title : ${this.state.title}`)
        console.log(`input : ${this.state.input}`)



        return (
            <div>
                {/* <SearchBar legacy={this.legacy} onChange={this.inputChange} /> */}
                <form autoComplete="off" onSubmit={this.getInfo}>
                    <input
                        type="text"
                        placeholder="Ex: Batman"
                        value={this.state.input}
                        onChange={this.inputChange}
                        name='searchInput'>
                    </input>
                    <button>Search</button>
                </form>
                {this.state.isLoaded &&
                    <div className="row">
                        {this.state.result
                            .filter((_, i) => i < 15)
                            .map((element, i) =>
                                <Response
                                    resultKey={element.poster_path}
                                    title={this.state.result[i].original_title}
                                    key={`list-${i}`}
                                    name={this.legacy}
                                />
                            )
                        }
                    </div>

                }
                {this.state.whenInfoIsfills &&
                    <div className="row">
                        {this.state.info.length &&
                            <div className="searchInfo">
                                <Movie info={this.state.info} />
                            </div>
                        }

                    </div>

                }


            </div>
        )
    }
}

export default AppMovie;