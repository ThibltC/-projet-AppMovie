import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ListMovies from './ListMovies';

import genres from './genres';

import './Search.css'

class Search extends Component {

    state = {
        genres,
        idsGenreSelected: [],
        namesGenreSelected: [],
        isPluriel: 's',

        moviesFound: [],

        runTimeMax: 90,
        idMovie: undefined,
        changeRoute: false,
        yearMin: 1907,
        yearMax: 2019,


    }

    // componentDidMount = () => {
    //     const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
    //     fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=fr-FR`)
    //         .then(response => response.json())
    //         .then(data => this.setState({
    //             genres: data.genres
    //         }))
    // }

    seachMovies = () => {
        // if (localStorage.getItem('Recherche')) {
        //     const el = JSON.parse(localStorage.getItem('Recherche'))
        //     this.setState({

        //         moviesFound: el.results,
        //     })
        // } else {
        const { runTimeMax, idsGenreSelected, yearMin, yearMax } = this.state
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=fr-FR&sort_by=popularity.desc&primary_release_date.gte=${yearMin}-01-01&primary_release_date.lte=${yearMax}-12-31&with_genres=${idsGenreSelected}&with_runtime.lte=${runTimeMax}`)
            .then(response => response.json())
            .then(data => {
                // localStorage.setItem('Recherche', JSON.stringify({moviesFound: data.results}))
                this.setState({
                    moviesFound: data.results,
                })
            })
        // }
    }

    addOrRemoveGenre = (e, id, name) => {
        e.preventDefault()
        const { idsGenreSelected, namesGenreSelected } = this.state
        let newId = idsGenreSelected
        let newName = namesGenreSelected
        if (namesGenreSelected.includes(name)) {
            this.setState({
                idsGenreSelected: newId.filter(e => e !== id),
                namesGenreSelected: newName.filter(e => e !== name)
            })
        } else {
            newId.push(id)
            newName.push(name)
            this.setState({
                idsGenreSelected: newId,
                namesGenreSelected: newName
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

    changeYearMin = (event) => {
        this.setState({
            yearMin: event.target.value
        })
    }
    changeYearMax = (event) => {
        this.setState({
            yearMax: event.target.value
        })
    }

    refrechState = () => {
        window.location.reload()
    }

    getIdMovie = (idMovie) => {
        this.setState({
            idMovie,
        })
    }


    render() {
        const { yearMax, yearMin, namesGenreSelected, isPluriel } = this.state
        console.log('ids', this.state.idsGenreSelected, 'names', this.state.namesGenreSelected)
        return (
            <div className='Search' >

                <Link to='/'>
                    <button>Accueil</button>
                </Link>
                <h2>Choisissez vos critères</h2>
                <div className='listGenres'>
                    {this.state.genres.map((e, i) => {
                        return (
                            <div className='genre' key={e.name} onClick={event => this.addOrRemoveGenre(event, e.id, e.name)}>
                                {e.name}
                            </div>
                        )
                    })}
                </div>
                {namesGenreSelected.length ?
                    // console.log(namesGenreSelected)
                    <h3>Vous avez choisi : {namesGenreSelected}</h3>
                    :
                    <h3>Pas de genre selectionné</h3>
                }
                <input type="range" name="runtime" min="0" max="240" step='10' value={this.state.runTimeMax} onChange={e => this.changeRunTimeMax(e)} />{this.convertMinToHours(this.state.runTimeMax)}
                <form>
                    <h3>Films apres :</h3>
                    <input type="number" name="yearMin" min="1907" max="2019" value={this.state.yearMin} onChange={e => this.changeYearMin(e)} />
                    <h3>Films avant :</h3>
                    <input type="number" name="yearMax" min="1907" max="2019" value={this.state.yearMax} onChange={e => this.changeYearMax(e)} />
                </form>
                <h2>{`Films compris entre ${yearMin} et ${yearMax} de style ${namesGenreSelected} dont la durée ne dépasse pas ${this.convertMinToHours(this.state.runTimeMax)}`}</h2>
                <button onClick={this.seachMovies}>Chercher</button>
                <button onClick={this.refrechState}>Effacer tout</button>

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