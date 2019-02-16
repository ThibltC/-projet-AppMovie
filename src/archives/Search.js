import React, { Component } from 'react';
import GenresList from './GenresList'


class Search extends Component {

    state = {
        infosMovie: undefined,
    }

    transformeId = (data) => {
        const obj = {}
        obj[data.id] = data.name
        return obj
    }

    test = async () => {
        const api_key = '91fe0a0af86fd4b9a59892545496d3b4'
        for (let i = 1; i < 2; i++) {
            await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=fr-FR&page=${i}`)
                .then(data => data.json())
                .then(data => {
                    for (let i = 0; i < 20; i++) {
                        console.log(data.results[i].id, data.results[i].title, data.results[i].genre_ids.map(e => GenresList[e]))
                    }
                })

            // this.setState({
            //     idMovie: data.results.id,
            //     title: data.results.title,
            //     genresMovie: data.results
            // })
        }
    }

    render() {
        return (

            <div className="Search">
                <button onClick={this.test}>TEST</button>
            </div>
        );
    }
}

export default Search;