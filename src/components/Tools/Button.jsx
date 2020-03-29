import React from 'react';
import { Button } from '@material-ui/core'

import useStyle from './styles';

const StyledButton = (props) => {

    const { label } = props;

    const classes = useStyle;

    return (
        <Button className={classes.button} {...props}>
            {label}
        </Button>
    );
}

export default StyledButton;
