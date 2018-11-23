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

        moviesFound: [],

        runTimeMax: 240,
        idMovie: undefined,
        changeRoute: false,
        yearMin: 1907,
        yearMax: 2019,
    }

    seachMovies = () => {
        const { runTimeMax, idsGenreSelected, yearMin, yearMax } = this.state
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=fr-FR&sort_by=popularity.desc&primary_release_date.gte=${yearMin}-01-01&primary_release_date.lte=${yearMax}-12-31&with_genres=${idsGenreSelected}&with_runtime.lte=${runTimeMax}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    moviesFound: data.results,
                    redirect: true
                })
            })
    }

    addOrRemoveGenre = (e, id, name) => {
        e.preventDefault()
        const { idsGenreSelected, namesGenreSelected } = this.state
        let newId = idsGenreSelected
        let newName = namesGenreSelected
        if (namesGenreSelected.includes(name)) {
            this.setState({
                idsGenreSelected: newId.filter(e => e !== id),
                namesGenreSelected: newName.filter(e => e !== name),
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

    getIdMovie = (idMovie) => {
        this.setState({
            idMovie,
        })
    }


    render() {
        const { yearMax, yearMin, namesGenreSelected, runTimeMax } = this.state
        return (
            <div className='Search' >
                <h2>Choisissez vos critères</h2>
                <Link to='/'>
                    <button className='backHome'>Retour à l'accueil</button>
                </Link>
                <div className='listGenres'>
                    {this.state.genres.map(e => {
                        return (
                            <div className='genre' key={e.name} onClick={event => this.addOrRemoveGenre(event, e.id, e.name)}>
                                {e.name}
                            </div>
                        )
                    })}
                </div>
                <form>
                    <input type="range" name="runtime" min="0" max="240" step='1' value={runTimeMax} onChange={e => this.changeRunTimeMax(e)} />{this.convertMinToHours(runTimeMax)}
                    <input type="range" name="yearMin" min="1907" max={yearMax} step='1' value={yearMin} onChange={e => this.changeYearMin(e)} />{yearMin}
                    <input type="range" name="yearMax" min={yearMin} max="2019" step='1' value={yearMax} onChange={e => this.changeYearMax(e)} />{yearMax}
                </form>
                <p>{`Films compris entre ${yearMin} et ${yearMax} dont la durée ne dépasse pas ${this.convertMinToHours(runTimeMax)}`}</p>
                {namesGenreSelected.length ?
                    <p>Vous avez choisi : {`${namesGenreSelected}`}</p>
                    :
                    <p>Pas de genre selectionné</p>
                }
                <div className='displayButtons'>
                    <button onClick={this.seachMovies}>Lancer la rechercher</button>
                    <button onClick={e => window.location.reload()}>Effacer tout</button>
                </div>

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
            </div>

        )
    }
}
export default Search