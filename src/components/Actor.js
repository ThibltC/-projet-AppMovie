import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListMovies from './ListMovies';
import Loader from './LoaderPage'

import grey from '@material-ui/core/colors/grey';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import './Actor.css';

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

    componentWillMount = async () => {
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        const { id } = this.props.match.params
        await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&language=fr-FR`)
            .then(data => data.json())
            .then(data => {
                this.setState({
                    actorDetails: data,
                })
                console.log(data)
            })
        fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}&language=fr-FR`)
            .then(data => data.json())
            .then(data => {
                this.setState({
                    actorFilmo: data,
                    isLoading: true,
                })
                console.log(data)
            })
    }

    getIdMovie = (idMovie) => {
        this.setState({
            idMovie: idMovie,
        })
    }


    render() {
        const { value, isLoading} = this.state;

        if (!isLoading) return <Loader />

        return (
            <div className='Actor'>
                <h2>{this.state.actorDetails.name}</h2>
                <img className='mainImage' src={`https://image.tmdb.org/t/p/w300${this.state.actorDetails.profile_path}`} alt="poster_path" />

                {this.state.actorDetails.birthday &&
                    <p>Anniversaire : {this.state.actorDetails.birthday.split('-').reverse().join('.')}</p>
                }
                <Link to='/'>
                    <button>Accueil</button>
                </Link>

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
                                    {this.state.actorFilmo.cast
                                        .sort((a, b) => b.popularity - a.popularity)
                                        .map((element, i) =>
                                            <Link to={`/movie${this.state.actorFilmo.cast[i].id}`} key={`movie-${i}`}>
                                                <ListMovies
                                                    movieDetails={element}
                                                    getIdMovie={this.getIdMovie}
                                                />
                                            </Link>
                                        )}
                                </div>
                            }
                            {value === 1 && <div/>}
                            {value === 2 && <div />}
                        </div>
                    </div>
                </MuiThemeProvider>

            </div>
        )
    }
}

export default Actor;