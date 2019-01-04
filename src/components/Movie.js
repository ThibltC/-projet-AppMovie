import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ListActors from '../components/ListActors';

import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Loader from 'react-loader-spinner';

import { redirection } from '../actions/redirectionActions'
import { getMovieInfos, getMovieCredits, emptyMovieInfos } from '../actions/moviesActions'

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
        isLoading: false,
        movieDetails: undefined,
        casting: undefined,
        idActor: undefined,
        checkedResume: false,
        checkedCasting: false,
        opacityValue: 1,

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

    convertMinToHours = (min) => {
        const h = Math.trunc(min / 60)
        const m = Math.ceil((min / 60 - h) * 60)
        if (m > 9) return h + 'h' + m
        return h + 'h0' + m
    }

    handleChangeResume = () => {
        this.setState(state => ({
            checkedResume: !state.checkedResume,
        }));
    };


    render() {
        const { movieDetails, isLoadingCredits, casting, classes } = this.props;
        const { opacityValue, checkedResume } = this.state

        if (!isLoadingCredits) return (
            <div className='loading'>
                <Loader
                    type="TailSpin"
                    color="grey"
                    height="200"
                    width="200"
                />
            </div>
        )

        return (
            isLoadingCredits &&
            <div className="Movie" onClick={this.props.emptyMovieInfos}>
                <Slide direction="up" in={checkedResume} mountOnEnter unmountOnExit>
                    <div className='resume' >
                        <p>{movieDetails.overview}</p>
                    </div>
                </Slide>
                <div className='displayMovie' style={{ opacity: `${opacityValue}` }} >
                    <h2>{movieDetails.title}</h2>

                    <img className='mainImage' src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt="poster_path" />
                    <div className='moviesInfos'>
                        <p>Sorti le {movieDetails.release_date.split('-').reverse().join('.')}</p>
                        <p>{this.convertMinToHours(movieDetails.runtime)}</p>
                    </div>
                    <div className='displayButtons'>
                        <p>Résumé</p>
                        <Switch checked={checkedResume}
                            onChange={this.handleChangeResume}
                            aria-label="Collapse"
                            classes={{
                                switchBase: classes.colorSwitchBase,
                                checked: classes.colorChecked,
                                bar: classes.colorBar,
                            }}
                        />
                        <Link to='/'>
                            <button onclick={this.props.redirection(false)} className='buttonHome'>Accueil</button>
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
        );
    }
}

const mapStateToProps = state => ({
    redirect: state.redirection.redirect,
    isLoadingCredits: state.movieData.isLoadingCredits,
    movieDetails: state.movieData.movieDetails,
    casting: state.movieData.casting
});

export default connect(mapStateToProps, { redirection, getMovieInfos, getMovieCredits, emptyMovieInfos })(withStyles(styles)(Movie));