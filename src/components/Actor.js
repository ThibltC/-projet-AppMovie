import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ListMovies from './ListMovies';
import Loader from './LoaderPage';
import HeaderMini from './HeaderMini';

import { getActorInfos, getFilmography, getTvgraphy } from '../actions/actorsActions'

import grey from '@material-ui/core/colors/grey';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import './Actor.css';

const api_key = process.env.REACT_APP_API_KEY;


const theme = createMuiTheme({
    palette: {
        primary: { main: grey[900] },
        secondary: { main: grey[500] }
    },
    typography: { useNextVariants: true }
})

class Actor extends Component {

    state = {
        actorFilmo: undefined,
        isLoading: false,
        idMovie: undefined,
        actorDetails: undefined,
        value: 0,
    }

    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };

    componentDidMount = () => {
        const { id } = this.props.match.params
        this.props.getActorInfos(id)
        this.props.getFilmography(id)
        this.props.getTvgraphy(id)

        fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}&language=fr-FR`)
            .then(data => data.json())
            .then(data => {
                this.setState({
                    actorFilmo: data,
                    isLoading: true,
                })
            })
    }

    getIdMovie = (idMovie) => {
        this.setState({
            idMovie: idMovie,
        })
    }


    render() {
        const { value } = this.state;
        const { actorDetails, isLoadingFilmo, actorFilmo, actorTv } = this.props

        if (!isLoadingFilmo) return (
            <Loader />
        )
        if (isLoadingFilmo && !actorDetails) return (
            <Loader />
        )

        return (
            <div className='Actor'>
                <HeaderMini />
                <div className='ActorBis'>
                    <div className='ActorDisplay'>
                        <h2>{actorDetails.name}</h2>
                        <img className='mainImage' src={`https://image.tmdb.org/t/p/w300${actorDetails.profile_path}`} alt="poster_path" />

                        {actorDetails.birthday &&
                            <p>Anniversaire : {actorDetails.birthday.split('-').reverse().join('.')}</p>
                        }
                        <Link to='/'>
                            <button>Accueil</button>
                        </Link>
                    </div>

                    <MuiThemeProvider theme={theme}>
                        <div className='Tabs'>
                            <AppBar position="static" className='AppBar' >
                                <Tabs value={value} onChange={this.handleChangeTabs}>
                                    <Tab label="Films" />
                                    <Tab label="Séries" />
                                    <Tab label="Biographie" />
                                </Tabs>
                            </AppBar>
                            <div className='tabContainer'>
                                {value === 0 &&
                                    <div className='ListMoviesBlock'>
                                        {actorFilmo.cast
                                            .sort((a, b) => b.popularity - a.popularity)
                                            .map((element, i) =>
                                                <Link to={`/movie${actorFilmo.cast[i].id}`} key={`movie-${i}`}>
                                                    <ListMovies
                                                        movieDetails={element}
                                                        getIdMovie={this.getIdMovie}
                                                    />
                                                </Link>
                                            )}
                                    </div>
                                }
                                {value === 1 &&
                                    <div className='ListMoviesBlock'>
                                        {actorTv.cast
                                            .sort((a, b) => b.popularity - a.popularity)
                                            .map((element, i) =>
                                                <ListMovies
                                                    movieDetails={element}
                                                    getIdMovie={this.getIdMovie}
                                                />
                                            )}
                                    </div>
                                }
                                {value === 2 &&
                                    <div className='biography'>
                                        {actorDetails.biography ? <p>{actorDetails.biography}</p> : <p>Pas de biographie...</p>}
                                    </div>
                                }
                            </div>
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoadingFilmo: state.actorData.isLoadingFilmo,
    actorDetails: state.actorData.actorDetails,
    actorFilmo: state.actorData.filmo,
    actorTv: state.actorData.tv
});

export default connect(mapStateToProps, { getActorInfos, getFilmography, getTvgraphy })(Actor);