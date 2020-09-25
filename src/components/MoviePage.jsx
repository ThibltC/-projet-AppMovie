import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import HeaderMini from './HeaderMini';
import Modal from './modalGenerator';
import ListActors from './ListActors';
import MovieResume from './MovieResume'

import { getMovieInfos, getMovieCredits } from '../actions/moviesActions'
import convertMinToHours from '../helpers/convertMinToHours'

import './Movie.css';

const MoviePage = (props) => {

    useEffect(() => {
        const { id } = props.match.params;
        props.getMovieInfos(id);
        props.getMovieCredits(id);
    }, [props]);


    const { movieDetails, casting } = props;


    if (!movieDetails && !casting) return <div>Loading...</div>

    return (
        <div className="Movie">
            <HeaderMini />
            <div className='MovieBis'>
                <div className='displayMovie'>
                    <h2>{movieDetails.title}</h2>
                    <img className='mainImage' src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt="poster_path" />
                    <div className='moviesInfos'>
                        <p>Sorti le {movieDetails.release_date.split('-').reverse().join('.')}</p>
                        <p>{convertMinToHours(movieDetails.runtime)}</p>
                    </div>
                    <div className='displayButtons' >
                        <Modal modalComponent={<MovieResume />} >
                            <button className='buttonHome'>Résumé</button>
                        </Modal>
                        <Link to='/'>
                            <button className='buttonHome'>Accueil</button>
                        </Link>
                    </div>
                </div>

                <div className='ListActorsBlock'>
                    {/* {casting.map((caracDetails, i) =>
                        <Link to={`/actor${caracDetails.id}`} key={`actor-${i}`}>
                            <ListActors
                                caracDetails={caracDetails}
                                getIdActor={this.getIdActor}
                            />
                        </Link>
                    )} */}
                </div>
            </div>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    movieDetails: state.movieData.movieDetails,
    casting: state.movieData.casting
});

export default connect(mapStateToProps, { getMovieInfos, getMovieCredits })(MoviePage);
