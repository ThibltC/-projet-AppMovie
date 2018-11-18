import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ListMovies from '../ListMovies/ListMovies';

import './Search.css'

class Search extends Component {

    state = {
        genres: [],
        moviesFound: [],
        idGenre: '',
        runTimeMax: 90,
        idMovie: undefined,
        changeRoute: false,
        year: 2000,
        nameGenre: ''

    }

    componentDidMount = () => {
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=fr-FR`)
            .then(response => response.json())
            .then(data => this.setState({
                genres: data.genres
            }))
    }

    seachMovies = () => {
        // if (localStorage.getItem('Recherche')) {
        //     const el = JSON.parse(localStorage.getItem('Recherche'))
        //     this.setState({

        //         moviesFound: el.results,
        //     })
        // } else {
        const { runTimeMax, idGenre, year } = this.state
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=fr-FR&sort_by=vote_count.desc&year=${year}with_genres=${idGenre}&with_runtime.lte=${runTimeMax}`)
            .then(response => response.json())
            .then(data => {
                // localStorage.setItem('Recherche', JSON.stringify({moviesFound: data.results}))
                this.setState({
                    moviesFound: data.results,
                })
            })
        // }
    }

    addIdGenre = (e, id, name) => {
        e.preventDefault()
        if (this.state.idGenre !== '' && !this.state.nameGenre.includes(name)) {
            this.setState({
                idGenre: `${this.state.idGenre},${id}`,
                nameGenre: `${this.state.nameGenre}, ${name}`
            })
        } else if (!this.state.nameGenre.includes(name)) {
            this.setState({
                idGenre: id,
                nameGenre: name
            })
        }


    }

    convertMinToHours = (min) => {
        const h = Math.trunc(min / 60)
        const m = Math.ceil((min / 60 - h) * 60)
        if (m > 9) return h + 'h' + m
        return h + 'h0' + m
    }

    changeRunTimeMax = (event) => {
        this.setState({
            runTimeMax: event.target.value
        })
    }

    changeYear = (event) => {
        this.setState({
            year: event.target.value
        })
    }

    refrechState = () => {
        this.setState({
            moviesFound: [],
            idGenre: '',
            runTimeMax: 90,
            idMovie: undefined,
            year: 2000,
            nameGenre: ''
        })
    }

    getIdMovie = (idMovie) => {
        this.setState({
            idMovie,
        })
    }


    render() {
        console.log(this.state.moviesFound)
        return (
            <div className='Search' >

                <Link to='/'>
                    <button>Accueil</button>
                </Link>
                <div className='listGenres'>
                    {this.state.genres.map((e, i) => {
                        return (<div className='genre' key={e.name} onClick={event => this.addIdGenre(event, e.id, e.name)}>{e.name}</div>)

                    })}
                </div>
                <input type="range" name="runtime" min="0" max="240" step='10' value={this.state.runTimeMax} onChange={e => this.changeRunTimeMax(e)} />{this.convertMinToHours(this.state.runTimeMax)}
                <input type="number" name="year" min="1970" max="2020" value={this.state.year} onChange={e => this.changeYear(e)} />
                <button onClick={this.seachMovies}>Chercher</button>
                <button onClick={this.refrechState}>Effacer tout</button>
                <h1>{this.state.nameGenre}</h1>
                <div className="response">
                    {this.state.moviesFound
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
                {/* <form onSubmit={_ => this.handleSubmit(e,id)}>
                    {this.state.genres.map((e, i) => {
                        return (<div><input type='checkbox' name={e.name} id={i} key={e.name} />{e.name}</div>)

                    })}
                    <input type='submit' value='caca' />
                </form> */}




            </div>

        )
    }
}
export default Search