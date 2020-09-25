import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ImageFrame from './ImageFrame';


const api_key = process.env.REACT_APP_API_KEY;

const useStyles = makeStyles({
    nowPlaying_root: {

    },
    nowPlaying_movies: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        paddingTop: '10px'
    },
});


const NowPlayingMovies = (props) => {

    const classes = useStyles();

    const [resultMovies, setResultMovies] = useState([]);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=fr-FR`;
        fetch(url)
            .then(response => response.json())
            .then(data => setResultMovies(data.results))
    }, []);
console.log(resultMovies)
    return (
        <div>
            <h2>Films du moment</h2>
            <div className={classes.nowPlaying_movies}>
                {resultMovies
                    .filter((_, i) => i < 10)
                    .map((element, i) =>
                        <ImageFrame
                            id={element.id}
                            image_path={element.poster_path}
                            type='movie'
                            label={element.title}
                            key={`movie-${i}`}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default NowPlayingMovies;
