import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Element } from "react-scroll";
import { connect } from 'react-redux';

import ListMoviesBlock from './ListMoviesBlock'

import { searchMoviesWithQuerys } from '../actions/searchActions'
import genres from '../helpers/genres';
import genresList from '../helpers/genresList'
import scrollTo from '../helpers/scrollTo'
import convertMinToHours from '../helpers/convertMinToHours'
import sessionStorageActions from '../helpers/sessionStorageActions'

import './Search.css'

const date = new Date()

class Search extends Component {

    state = {
        idsGenreSelected: [],
        namesGenreSelected: [],
        idMovie: undefined,
        runTimeMax: 240,
        yearMin: 1907,
        yearMax: date.getFullYear(),
        originalLanguage: '',
        numPage: 1
    }

    componentDidMount = () => {
        const newState = sessionStorageActions('get')
        if (newState.numPage) {
            this.setState({
                idsGenreSelected: newState.idsGenreSelected,
                yearMin: parseInt(newState.yearMin),
                yearMax: parseInt(newState.yearMax),
                runTimeMax: parseInt(newState.runTimeMax),
                numPage: parseInt(newState.numPage),
                namesGenreSelected: newState.idsGenreSelected.map(e => genresList[e])
            })
        }
    }

    seachMovies = () => {
        const { idsGenreSelected, yearMin, yearMax, runTimeMax, numPage, originalLanguage } = this.state
        sessionStorageActions('set', idsGenreSelected, yearMin, yearMax, runTimeMax, numPage)
        this.props.searchMoviesWithQuerys(runTimeMax, idsGenreSelected, yearMin, yearMax, originalLanguage, numPage)
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

    handleChangeNumPage = async (e) => {
        await this.setState({
            numPage: e.target.value
        })
        this.searchWithNumPage(e)
    }

    searchWithNumPage = async (e, sign) => {
        e.preventDefault()
        if (sign === '+1') {
            await this.setState({
                numPage: this.state.numPage + 1
            })
            sessionStorage.setItem('numPage', this.state.numPage)
        } else {
            await this.setState({
                numPage: this.state.numPage - 1
            })
            sessionStorage.setItem('numPage', this.state.numPage)
        }
        const { runTimeMax, idsGenreSelected, yearMin, yearMax, originalLanguage, numPage } = this.state
        this.props.searchMoviesWithQuerys(runTimeMax, idsGenreSelected, yearMin, yearMax, originalLanguage, numPage)
    }

    getIdMovie = (idMovie) => {
        this.setState({
            idMovie,
        })
    }


    render() {
        const { yearMax, yearMin, namesGenreSelected, runTimeMax, numPage } = this.state
        const { resultsMoviesFonded, numPagesTotal } = this.props
        const pagesTotal = numPagesTotal < 1000 ? numPagesTotal : 1000
        return (
            <div className='Search'>
                <div className='SearchElements' >
                    <h2>Choisissez vos critères</h2>
                    <div className='displayButtons'>
                        <Link to='/'>
                            <button className='backHome'>Retour à l'accueil</button>
                        </Link>
                    </div>
                    <div className='paramsDisplay'>
                        <div className='listGenres'>
                            {genres.map(el => {
                                return (
                                    <div className='genre' key={el.name} onClick={event => this.addOrRemoveGenre(event, el.id, el.name)}>
                                        {el.name}
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
                        <button onClick={_ => {
                            window.location.reload()
                            sessionStorage.clear()
                        }}>Effacer tout</button>
                    </div>
                </div>
                <Element name="goResponse">
                    <ListMoviesBlock resultsMoviesFonded={resultsMoviesFonded} />
                </Element>
                {pagesTotal &&
                    <div className='numPageDisplay'>
                        {numPage > 1 && <button onClick={(e) => this.searchWithNumPage(e, '-1')}>{'<'}</button>}
                        <p>{numPage}/{pagesTotal}</p>
                        {numPage < pagesTotal && <button onClick={(e) => this.searchWithNumPage(e, '+1')}>{'>'} </button>}
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    resultsMoviesFonded: state.LFParticularMovie.moviesFounded,
    numPagesTotal: state.LFParticularMovie.numPagesTotal
});

export default connect(mapStateToProps, { searchMoviesWithQuerys })(Search);
