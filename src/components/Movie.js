import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import ListActors from '../components/ListActors';

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

    handleChangeResume = () => {
        this.setState(state => ({ checkedResume: !state.checkedResume, checkedCasting: false }));
    };
    handleChangeCasting = () => {
        this.setState(state => ({ checkedCasting: !state.checkedCasting, checkedResume: false }));
    };

    render() {
        const { classes } = this.props;
        const { checkedResume, checkedCasting, movieDetails } = this.state;

        if (!this.state.isLoading) return <div className='loading'>Loading...</div>

        return (
            this.state.isLoading &&
            <div className="Movie">
                <h2>{movieDetails.title}</h2>
                <img className='mainImage' src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt="poster_path" />
                <div className='moviesInfos'>
                    <p>Sorti le {movieDetails.release_date.split('-').reverse().join('.')}</p>
                    <p>{this.convertMinToHours(movieDetails.runtime)}</p>
                </div>

                <div className=''>Résumé
                    <Switch checked={checkedResume}
                        onChange={this.handleChangeResume}
                        aria-label="Collapse"
                        classes={{
                            switchBase: classes.colorSwitchBase,
                            checked: classes.colorChecked,
                            bar: classes.colorBar,
                        }} />
                    Casting
                    <Switch checked={checkedCasting}
                        onChange={this.handleChangeCasting}
                        aria-label="Collapse"
                        classes={{
                            switchBase: classes.colorSwitchBase,
                            checked: classes.colorChecked,
                            bar: classes.colorBar,
                        }} />
                    <Link to='/'>
                        <button className='buttonHome'>Accueil</button>
                    </Link>
                </div>

                <Slide direction="up" in={checkedResume} mountOnEnter unmountOnExit>
                    <div className='resume' >
                        <p>{movieDetails.overview}</p>
                    </div>
                </Slide>
                <Slide direction="up" in={checkedCasting} mountOnEnter unmountOnExit>
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
                </Slide>
            </div>
        );
    }
}

export default withStyles(styles)(Movie);