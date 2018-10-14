import React, { Component } from 'react';
import Response from './Response';
import './AppMovie.css'
// import SearchBar from './SearchBar';

class AppMovie extends Component {


    state = {
        input: '',
        result: [],
        titlesAutoComp: [],
        isLoaded: false,
        title: ''
    }


    getMovie = () => {
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-FR&query=${this.state.input}&page=1&region=FR&language=fr`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    result: data.results,
                    isLoaded: true
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

    // getSubmit = () => {

    // }

    legacy = async (title) => {
        await this.setState({ title })
        this.setState({input: this.state.title})
    }


    render() {
        console.log(`title : ${this.state.title}`)
        console.log(`input : ${this.state.input}`)
        console.log(this.state.result.map(e=>e.title))



        return (
            <div>
                {/* <SearchBar legacy={this.legacy} onChange={this.inputChange} /> */}
                <form autoComplete="off" >
                    <input
                        type="text"
                        placeholder="Ex: Batman"
                        value={this.state.input}
                        onChange={this.inputChange}>
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
                                    title={this.state.result[i].title}
                                    key={`list-${i}`}
                                    name={this.legacy}
                                />
                            )
                        }
                    </div>

                }
            </div>
        )
    }
}

export default AppMovie;