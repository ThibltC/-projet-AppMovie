import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const useStyle = makeStyles(theme => ({
    button : {   
        border: '2px solid',
        font: 'inherit',
        padding: '0.6em 1em',
        margin: '20px',
        transition: '0.2s',
        boxShadow: `inset 4px 4px 15px rgb(66, 66, 66),
        inset -4px -4px 15px rgb(66, 66, 66),
        5px 5px 10px rgb(32, 32, 32)`,
        borderRadius: '8px',
        backgroundColor: 'black',
        color: 'rgb(182, 179, 179)',
      } 
}))

const StyledButton = (props) => {

    const { label } = props;

    const classes = useStyle();

    return (
        <Button className={classes.button} {...props}>
            {label}
        </Button>
    );
}

export default StyledButton;
