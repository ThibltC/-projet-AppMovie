import React, { Component } from 'react';
import './ListMovies.css'


class ListMovies extends Component {

    render() {
        const { id, poster_path, title, name } = this.props.movieDetails
        return (
            <div className="ListMovies" onClick={_ => this.props.getIdMovie(id)}>
                {poster_path ?
                    <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} />
                    :
                    <img src={'https://cdn.browshot.com/static/images/not-found.png'} alt={title} />
                }
                {title ? <h3>{title}</h3> : <h3>{name}</h3>}
            </div>
        );
    }
}

export default ListMovies;
