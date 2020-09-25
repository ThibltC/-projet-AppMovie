import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import ImageFrame from './ImageFrame';

const useStyles = makeStyles({
    row: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        paddingTop: '10px'
    },
});


const ImageFrameRow = (props) => {

    const classes = useStyles();

    const { path, label, type } = props.labels;
    const { url } = props

    const [imageFrameList, setImageFrameList] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setImageFrameList(data.results))
    }, [url]);

    
    return (
        <div className={classes.row}>
            {imageFrameList
                .filter((_, i) => i < 10)
                .map((element, i) =>
                    <ImageFrame
                        id={element.id}
                        image_path={element[path]}
                        type={type}
                        label={element[label]}
                        key={`${type}-${i}`}
                    />
                )
            }
        </div>
    );
};

export default ImageFrameRow;

ImageFrameRow.propTypes = {
    labels: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
};
