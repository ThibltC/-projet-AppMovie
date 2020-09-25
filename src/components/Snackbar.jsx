import React, { useContext } from 'react';

import { IconButton, Snackbar } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import CombinedContext from '../contexts/combineContext';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    close: {
        color: theme.palette.secondary,
        padding: theme.spacing(0.5),
    },
}));


const SnackbarComponent = () => {

    const classes = useStyles();

    const [combineState, combineDispatch] = useContext(CombinedContext);

    const { message, isSnackbarOpened } = combineState.snackbar;


    const handleClose = () => {
        combineDispatch({ type: "CLOSE_SNACKBAR" });
    };


    return (
        <div className={classes.container}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isSnackbarOpened}
                autoHideDuration={6000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{message}</span>}
                action={
                    <IconButton
                        key="close"
                        aria-label="Close"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            />
        </div>
    );
};

export default SnackbarComponent;
