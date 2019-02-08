import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ListActors from './ListActors';
import HeaderMini from './HeaderMini';
import Loader from './LoaderPage';

import { AppBar, Slide, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';


import { redirection } from '../actions/redirectionActions'
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
        value: 0

    }

    componentDidMount = async () => {
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
        const { opacityValue, checkedResume, value } = this.state

        // if (!isLoadingCredits) return (
        //     <Loader />
        // )
        // if (isLoadingCredits && !movieDetails) return (
        //     <Loader />
        // )
        return (
            (isLoadingCredits && movieDetails) &&
            <div className="Movie" onClick={this.props.cleanMovieInfos} >
                <HeaderMini />
                <Slide direction="up" in={checkedResume} mountOnEnter unmountOnExit>
                    <div className='resume' >
                        <p>{movieDetails.overview}</p>
                    </div>
                </Slide>
                <div className='Appbar'>
                    <AppBar position="static">
                        <Tabs value={value} onChange={this.handleChange}>
                            <Tab label="Item One" />
                            <Tab label="Item Two" />
                            <Tab label="Item Three" />
                        </Tabs>
                    </AppBar>

                </div>
                <div className='MovieBis'>
                    <div className='displayMovie' style={{ opacity: `${opacityValue}` }} >
                        <h2>{movieDetails.title}</h2>

                        <img className='mainImage' src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt="poster_path" />
                        <div className='moviesInfos'>
                            <p>Sorti le {movieDetails.release_date.split('-').reverse().join('.')}</p>
                            <p>{convertMinToHours(movieDetails.runtime)}</p>
                        </div>
                        <div className='displayButtons' >
                            <button onClick={this.handleChangeResume} className='buttonHome'>Résumé</button>
                            <Link to='/'>
                                <button onClick={this.props.redirection(false)} className='buttonHome'>Accueil</button>
                            </Link>
                        </div>
                    </div>

                    <div className='listResults'>
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

            </div>
        );
    }
}

const mapStateToProps = state => ({
    redirect: state.redirection.redirect,
    isLoadingCredits: state.movieData.isLoadingCredits,
    movieDetails: state.movieData.movieDetails,
    casting: state.movieData.casting
});

export default connect(mapStateToProps, { redirection, getMovieInfos, getMovieCredits, cleanMovieInfos })(withStyles(styles)(Movie));