import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '65px',
        backgroundColor: '#282c34',
        height: '300px',
        display: 'flex',
        position: 'relative',
        '& h2': {
            zIndex: '15',
            fontSize: '40px',
            color: 'rgb(247, 245, 245)',
            alignSelf: 'center',
            textShadow: '5px 5px 10px rgb(22, 22, 22)',
        }
    },
    filterImage: {
        position: 'absolute',
        background: 'linear-gradient(to right, #282c34 10%, transparent ), linear-gradient(to top, #282c34 , transparent )',
        height: '300px',
        width: '700px',
        zIndex: 10,
        right: 0,
    },
    image: {
        position: 'absolute',
        right: 0,
        height: '300px',
        width: '700px',
        objectFit: 'cover',
        zIndex: 5,
    },
    flex: {
        display: 'flex',
        flexDirection: 'row'
    },
    movieInfos: {
        zIndex: 15,
        display: 'flex',
        flexDirection: 'column',
        margin : '14px',
        width: '40vw'
    
    }
}));


const api_key = process.env.REACT_APP_API_KEY;

const HeaderMovie = () => {
    const classes = useStyles();


    const [randomMovie, setRandomMovie] = useState();
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=fr-FR`)
            .then(response => response.json())
            .then(json => {
                return setRandomMovie(json.results[parseInt(Math.random() * 20)]);
            })
    }, [])


    console.log(randomMovie)


    const bg_image = randomMovie && (randomMovie.backdrop_path ? randomMovie.backdrop_path : randomMovie.poster_path);

    return (
        <header className={classes.root}>
            {randomMovie &&
                <>
                    <Link to={`/movie/${randomMovie.id}`} >
                        <div className={classes.flex}>
                            <div className={classes.movieInfos}>
                                <h3>{randomMovie.title}</h3>
                                <p>{randomMovie.overview}</p>
                            </div>
                            <>
                                <div className={classes.filterImage} />
                                <img className={classes.image} src={`https://image.tmdb.org/t/p/original${bg_image}`} alt={randomMovie.title} />
                            </>
                        </div>

                    </Link>
                </>
            }
        </header>
    );
};


export default HeaderMovie;
