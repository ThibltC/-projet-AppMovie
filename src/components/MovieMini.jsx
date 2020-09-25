import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addLastPageToBreadcrumb } from '../actions/breadcrumbActions';

import './ListMovies.css'


const MovieMini = (props) => {

    const { id, poster_path, title, name, profile_path } = props.movieDetails;

    const [redirect, setRedirect] = useState({
        activated: false,
        to: '/'
    });

    const handleClickToMoreInfo = (idMovie) => {
        props.addLastPageToBreadcrumb(props.location.pathname)
        setRedirect({
            activated: true,
            to: `/movie/${idMovie}`
        });
    };


    if (redirect.activated) return <Redirect to={redirect.to} />;

    return (
        <div className="ListMovies" onClick={() => handleClickToMoreInfo(id)}>
            {poster_path ?
                <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} />
                :
                <img src={'https://cdn.browshot.com/static/images/not-found.png'} alt={title} />
            }
            {profile_path ?
                <img src={`https://image.tmdb.org/t/p/w300${profile_path}`} alt={title} />
                :
                <img src={'https://cdn.browshot.com/static/images/not-found.png'} alt={title} />
            }
            {title ? <h3>{title}</h3> : <h3>{name}</h3>}
        </div>
    );
};

export default connect(() => ({}), { addLastPageToBreadcrumb })(MovieMini)
