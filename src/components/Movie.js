import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ListActors from './ListActors';
import HeaderMini from './HeaderMini';
import Loader from './LoaderPage';
import Modal from './Modal';

import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';


import { redirection, redirectionDone } from '../actions/redirectionActions'
import { getMovieInfos, getMovieCredits, cleanMovieInfos } from '../actions/moviesActions'
import convertMinToHours from '../helpers/convertMinToHours'

import './Movie.css';


const styles = () => ({
    colorSwitchBase: {
        color: grey[500],
        '&$colorChecked': {
            color: grey[800],
            '& + $colorBar': {
                backgroundColor: grey[500],
            },
        },
    },
    colorBar: {},
    colorChecked: {},
})

class Movie extends Component {

    state = {
        idActor: undefined,
        checkedResume: false,
        checkedCasting: false,
        opacityValue: 1,
    }

    componentDidMount = async () => {
        this.props.redirectionDone()
        const { id } = this.props.match.params
        try {
            await this.props.getMovieInfos(id)
            this.props.getMovieCredits(id)
        } catch (e) {

        }

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
        const { opacityValue } = this.state


        // if (movieDetails.status_code === 34) return (
        //     <Redirect to='/' />
        // )
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
                        <div className='displayMovie' style={{ opacity: `${opacityValue}` }} >
                            <h2>{movieDetails.title}</h2>
                            <img className='mainImage' src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt="poster_path" />
                            <div className='moviesInfos'>
                                <p>Sorti le {movieDetails.release_date.split('-').reverse().join('.')}</p>
                                <p>{convertMinToHours(movieDetails.runtime)}</p>
                            </div>
                            <div className='displayButtons' >
                                <Modal />
                                {/* <button onClick={this.handleChangeResume} className='buttonHome'>Voir le résumé</button> */}
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

export default connect(mapStateToProps, { redirection, redirectionDone, getMovieInfos, getMovieCredits, cleanMovieInfos })(withStyles(styles)(Movie));