import React, { Component } from 'react';
import logo from './logo.svg';
import './Header.css';
import { Link } from 'react-router-dom';


class Header extends Component {

    state = {
        randomMovie: undefined,
        imageLoaded: false,
    }

    componentWillMount = () => {
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=fr-FR&page=1&region=Fr`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    randomMovie: data.results[Math.floor(Math.random() * 20)],
                    imageLoaded: true
                });
            });
    }

    render() {
        const {randomMovie} = this.state
        return (
            <header className="Header">
                <img src={logo} className="Header-logo" alt="logo" />
                <p>App Movies</p>
                {this.state.imageLoaded &&
                    <Link to={`/movie${randomMovie.id}`} >
                        <div className='randomHeaderStyle'>
                            <div className='filtreImage'></div>
                            <img src={`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`} alt={randomMovie.title} />
                        </div>
                    </Link>
                }
            </header>
        )
    }
}

export default Header;