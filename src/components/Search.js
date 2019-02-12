import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Element } from "react-scroll";

import ListMovies from './ListMovies';

import genres from '../helpers/genres';
import scrollTo from '../helpers/scrollTo'
import convertMinToHours from '../helpers/convertMinToHours'

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
        scrollTo("goResponse")
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
            <div className='SearchComponent'>
                <div className='Search' >
                    <h2>Choisissez vos critères</h2>
                    <div className='displayButtons'>
                        <Link to='/'>
                            <button className='backHome'>Retour à l'accueil</button>
                        </Link>
                    </div>
                    <div className='paramsDisplay'>
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
                            <input type="range" name="runTimeMax" min="0" max="240" step='1' value={runTimeMax} onChange={this.handleChange} />
                            Durée Max : {convertMinToHours(runTimeMax)}
                            <input type="range" name="yearMin" min="1907" max={yearMax} step='1' value={yearMin} onChange={this.handleChange} />
                            Année Min : {yearMin}
                            <input type="range" name="yearMax" min={yearMin} max="2019" step='1' value={yearMax} onChange={this.handleChange} />
                            Année Max : {yearMax}
                        </form>
                    </div>

                    <p>{`Films compris entre ${yearMin} et ${yearMax} dont la durée ne dépasse pas ${convertMinToHours(runTimeMax)}`}</p>
                    {namesGenreSelected.length ?
                        <p>Vous avez choisi : {`${namesGenreSelected}`}</p>
                        :
                        <p>Pas de genre selectionné</p>
                    }
                    <div className='displayButtons'>
                        <button onClick={this.seachMovies}>Lancer la rechercher</button>
                        <button onClick={e => window.location.reload()}>Effacer tout</button>
                    </div>
                </div>
                <Element name="goResponse">
                    <div className="response">
                        {this.state.moviesFound
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
                </Element>
            </div>

        )
    }
}
export default Search