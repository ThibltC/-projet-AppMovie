import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ListMovies from './ListMovies';

class ListMoviesBlock extends Component {

    state = {
        idMovie: undefined,
    }
    
    getIdMovie = (idMovie) => {
        this.setState({
            idMovie,
        })
    }

    render() {
        const { resultsMoviesFonded } = this.props
        return (
            <div className="ListMoviesBlock">
                {resultsMoviesFonded
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
        )
    }
}

export default ListMoviesBlock
