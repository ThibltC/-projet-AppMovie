import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ListActors from './ListActors';
import HeaderMini from './HeaderMini';
import Loader from './LoaderPage';
import Modal from './Modal';

import { redirection, redirectionDone } from '../actions/redirectionActions'
import { getMovieInfos, getMovieCredits } from '../actions/moviesActions'
import convertMinToHours from '../helpers/convertMinToHours'

import './Movie.css';

class Movie extends Component {

    state = {
        idActor: undefined,
    }

    componentDidMount = async () => {
        this.props.redirectionDone()
        const { id } = this.props.match.params
        await this.props.getMovieInfos(id)
        this.props.getMovieCredits(id)
    }

    getIdActor = (idActor) => {
        this.setState({
            idActor,
        })
    }

    handleChangeResume = () => {
        this.setState(state => ({
            checkedResume: !state.checkedResume,
        }));
    };


    render() {
        const { movieDetails, isLoadingCredits, casting } = this.props;

        if (!isLoadingCredits) return (
            <Loader />
        )
        if (isLoadingCredits && !movieDetails) return (
            <Loader />
        )
        return (
            (isLoadingCredits && movieDetails) &&
            <div className="Movie">
                <HeaderMini />
                {movieDetails.status_code === 34 ? <Redirect to='/error404' /> :
                    <div className='MovieBis'>
                        <div className='displayMovie'>
                            <h2>{movieDetails.title}</h2>
                            <img className='mainImage' src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt="poster_path" />
                            <div className='moviesInfos'>
                                <p>Sorti le {movieDetails.release_date.split('-').reverse().join('.')}</p>
                                <p>{convertMinToHours(movieDetails.runtime)}</p>
                            </div>
                            <div className='displayButtons' >
                                <Modal />
                                <Link to='/'>
                                    <button className='buttonHome'>Accueil</button>
                                </Link>
                            </div>
                        </div>

                        <div className='ListActorsBlock'>
                            {casting.map((caracDetails, i) =>
                                <Link to={`/actor${caracDetails.id}`} key={`actor-${i}`}>
                                    <ListActors
                                        caracDetails={caracDetails}
                                        getIdActor={this.getIdActor}
                                    />
                                </Link>
                            )}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoadingCredits: state.movieData.isLoadingCredits,
    movieDetails: state.movieData.movieDetails,
    casting: state.movieData.casting
});

export default connect(mapStateToProps, { redirection, redirectionDone, getMovieInfos, getMovieCredits })(Movie);