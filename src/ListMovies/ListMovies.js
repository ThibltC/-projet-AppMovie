import React, { Component } from 'react';
import './ListMovies.css'


class ListMovies extends Component {

    render() {
        return (
            <div className="ListMovies" onClick={_ => this.props.getIdMovie(this.props.movieDetails.id)}>
            {this.props.movieDetails.poster_path ?
                <img src={`https://image.tmdb.org/t/p/w300${this.props.movieDetails.poster_path}`} alt={this.props.movieDetails.title} className='zoom' />
                :
                <img src={'https://cdn.browshot.com/static/images/not-found.png'} alt={this.props.movieDetails.title} />
            }
            </div>
        );
    }
}

export default ListMovies;
