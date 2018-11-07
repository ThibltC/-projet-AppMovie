import React, { Component } from 'react';
import logo from './logo.svg';
import './Header.css';


class Header extends Component {

    state={
        randomMoviePoster:undefined,
        imageLoaded: false
    }

    componentWillMount = async () => {
        const api_key = "91fe0a0af86fd4b9a59892545496d3b4"
        await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=fr-FR&page=1&region=Fr`)
            .then(response => response.json())
            .then(data => {console.log(data.results)
                this.setState({
                    randomMoviePoster: data.results[Math.floor(Math.random() * 20)],
                    imageLoaded: true
                });
            });
    }

    render() {
        return (
            <header className="Header">
                <img src={logo} className="Header-logo" alt="logo" />
                <p>App Movies</p>
                {this.state.imageLoaded &&
                    <div className='randomHeaderStyle'>
                        <div className='filtreImage'></div>
                        <img src={`https://image.tmdb.org/t/p/original${this.state.randomMoviePoster.backdrop_path}`} alt={this.state.randomMoviePoster.title} />
                    </div>}
            </header>
        )
    }
}

export default Header;