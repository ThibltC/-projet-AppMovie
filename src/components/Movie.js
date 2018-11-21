import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ListActors from '../components/ListActors';

import './Movie.css';


class Movie extends Component {

    state = {
        isLoading: false,
        movieDetails: undefined,
        casting: undefined,
        idActor: undefined,
    }

    componentWillMount = async () => {
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${api_key}&language=fr-FR`)
            .then(data => data.json())
            .then(data => {
                this.setState({
                    movieDetails: data,
                })
            })
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=${api_key}&language=fr-FR`)
            .then(data => data.json())
            .then(data => {
                this.setState({
                    casting: data.cast,
                    isLoading: true,
                })
            })
    }

    getIdActor = (idActor) => {
        this.setState({
            idActor,
        })
    }

    convertMinToHours = (min) => {
        const h = Math.trunc(min / 60)
        const m = Math.ceil((min / 60 - h) * 60)
        if (m > 9) return h + 'h' + m
        return h + 'h0' + m
    }
    algoDeMalade = (b, r) => {
        if (r - b < 0) return 'Nul'
        return 'Bien'
    }

    render() {
        if (!this.state.isLoading)
            return <div className='loading'>Loading...</div>
        const { movieDetails } = this.state
        console.log(this.state.casting)
        return (
            this.state.isLoading &&
            <div className="Movie">
                <h1>{movieDetails.title}</h1>
                <img className='mainImage' src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt="poster_path" />
                <p>Date de sortie : {movieDetails.release_date.split('-').reverse().join('.')}</p>

                <p>Durée : {this.convertMinToHours(movieDetails.runtime)}</p>
                <p>Résumé : {movieDetails.overview}</p>
                <p>{this.algoDeMalade(movieDetails.budget, movieDetails.revenue)}</p>
                <Link to='/'>
                    <button className='buttonHome'>Accueil</button>
                </Link>
                <p>Casting :</p>
                <div className='listResults'>
                    {this.state.casting.map((caracDetails, i) =>
                        <Link to={`/actor${caracDetails.id}`} key={`actor-${i}`}>
                            <ListActors
                                caracDetails={caracDetails}
                                getIdActor={this.getIdActor}
                            />
                        </Link>
                    )}
                </div>

            </div>
        );
    }
}

export default Movie;