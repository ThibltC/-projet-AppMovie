import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import CombinedContext from '../contexts/combineContext';
import TranslationContext from '../contexts/translationContext';
import CircularProgress from '@material-ui/core/CircularProgress';

const borderShadow = 'inset 5px 5px 10px rgb(66, 66, 66), inset -5px -5px 10px rgb(66, 66, 66)';

const useStyles = makeStyles({
    frame: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        margin: '0px 5px',
        alignItems: 'center',
        '& img': {
            padding: '10px',
            transition: '0.2s',
            border: '2px solid black',
            borderRadius: '8px',
            boxShadow: `${borderShadow}, 5px 5px 10px rgb(32, 32, 32)`,
            objectFit: 'cover',
            height: '300px',
            width: '200px',
            margin: '8px',
        },
        '& img:hover': {
            transform: 'scale(1.10)',
            boxShadow: `${borderShadow}, 15px 15px 10px rgb(32, 32, 32)`,
        },
    },
});


const ImageFrame = (props) => {

    const classes = useStyles();

    const { id, image_path, label, type } = props;

    const [, combinedDispatch] = useContext(CombinedContext);
    const [t] = useContext(TranslationContext);

    const [redirect, setRedirect] = useState({
        activated: false,
        to: '/'
    });


    const handleClickToMoreInfo = (id) => {
        combinedDispatch({ type: 'ADD_CRUMB', lastPage: window.location.pathname });
        if (type && id) {
            setRedirect({
                activated: true,
                to: `/${type}/${id}`
            });
        } else {
            combinedDispatch({ type: 'ACTIVE_SNACKBAR', message: t('alertMessage', 'error') });
        }
    };

    const src = image_path ? `https://image.tmdb.org/t/p/w300${image_path}` : 'https://cdn.browshot.com/static/images/not-found.png';


    if (redirect.activated) return <Redirect to={redirect.to} />;
    return (
        <div className={classes.frame} onClick={() => handleClickToMoreInfo(id)}>
            <img src={src} alt={label} />
            <h3>{label}</h3>
        </div>
    );
};

export default ImageFrame;

ImageFrame.propTypes = {
    id: PropTypes.number,
    image_path: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
};
