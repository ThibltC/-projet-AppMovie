import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Actor from '../Actor/Actor';

import './Movie.css';


class Movie extends Component {

    state = {
        isLoading: false,
        movieDetails: undefined,
        casting: undefined,
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

    convertMinToHours = (min) => {
        const h = Math.trunc(min / 60)
        const m = Math.ceil((min / 60 - h) * 60)
        if (m > 9) return h + 'h' + m
        return h + 'h0' + m
    }

    render() {
        if (!this.state.isLoading)
            return <p>LOADING...</p>
        const { movieDetails } = this.state
        console.log(this.state.movieDetails)
        return (
            this.state.isLoading &&
            <div className="Movie">
                <img src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt="poster_path" />
                <p>Date de sortie : {movieDetails.release_date}</p>
                <p>Title : {movieDetails.title}</p>
                <p>Durée : {this.convertMinToHours(movieDetails.runtime)}</p>
                <Link to='/'>
                    <button>Accueil</button>
                </Link>
                <div className='casting'>
                    {this.state.casting.map(caracDetails =>
                        <Actor caracDetails={caracDetails} />
                    )}
                </div>

            </div>
        );
    }
}

export default Movie;