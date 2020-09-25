import React, { useContext } from 'react';

import ImageFrameRow from './ImageFrameRow';

import TranslationContext from '../contexts/translationContext';

const api_key = process.env.REACT_APP_API_KEY;


const MostPopularActors = () => {

    const [t] = useContext(TranslationContext);

    const labels = {
        path: 'profile_path',
        label: 'name',
        type: 'actor'
    };
    const url = `https://api.themoviedb.org/3/person/popular?api_key=${api_key}&language=fr-FR`;

    return (
        <>
            <h2>{t('title', 'person_popular')}</h2>
            <ImageFrameRow url={url} labels={labels} />
        </>
    );
};

export default MostPopularActors;
