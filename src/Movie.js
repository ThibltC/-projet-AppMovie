import React, { Component } from 'react';
import { Animated } from "react-animated-css";


class Movie extends Component {

    render() {
        console.log(this.props.info)
        const { info } = this.props
        return (
            <div className="DisplayMovie">
                <Animated animationIn="fadeIn" isVisible={true}>
                    <img src={`https://image.tmdb.org/t/p/w300${info[0].poster_path}`} alt="poster_path" />
                    <p>Release : {info[0].release_date}</p>
                    <p>Title: {info[0].title}</p>
                </Animated>
            </div>
        );
    }
}

export default Movie;