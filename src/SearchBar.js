import React, { Component } from 'react';
// import Response from './Response';

class SearchBar extends Component {

    //     state = {
    //         input: '',
    //         result: []
    //     }
    //     getMovie = async (event) => {
    //         event.preventDefault()
    //         const movieRequest = event.target.searchBarInput.value
    //         const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
    //         fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-FR&query=${movieRequest}&page=1&region=FR&language=fr`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 this.setState({
    //                     result: data.results
    //                 });
    //             });
    //     }

    //     inputChange = (event) => {
    //         this.setState({
    //             input: event.target.value
    //         })
    //         this.autoComp();
    //     }

    //     autoComp = async () => {
    //         const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
    //         fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-FR&query=${this.state.input}&page=1&region=FR&language=fr`)
    //             .then(response => response.json())
    //             .then(data => console.log(data.results.map(x => x.title)))
    //     }




    //     render() {
    //         return (
    //             <div>
    //                 <form onSubmit={this.props.search}>
    //                     <input
    //                         type="text"
    //                         name="searchBarInput"
    //                         placeholder="Ex: Batman"
    //                         onChange={this.inputChange}>
    //                     </input>
    //                     <button>Search</button>
    //                 </form>
    //                 <div className="row">
    //                     {this.state.result.map((element, index) => <Response resultKey={element.poster_path} index={index} />).filter((e, i) => i < 5)}
    //                 </div>
    //             </div>
    //         )
    //     }
    // }
    render() {
        return (
            <form >
                <input
                    type="text"
                    placeholder="Ex: Batman"
                    onChange={el => this.props.legacy(el.target.value)}>
                </input>
                <button>Search</button>
            </form>
        )
    }
}


export default SearchBar;