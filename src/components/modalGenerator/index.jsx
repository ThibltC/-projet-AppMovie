import React, { useState } from 'react';
import PropTypes from 'prop-types';


import { Modal } from '@material-ui/core';

import useStyles from './style'



const ModalGenerator = (props) => {

    const {
        children,
        handleOpenAction = () => { },
        handleCloseAction = () => { },
        modalComponent
    } = props;

    const classes = useStyles();

    const [isOpened, setOpen] = useState(false);

    const handleOpen = () => {
        handleOpenAction();
        setOpen(true);
    };

    const handleClose = () => {
        handleCloseAction()
        setOpen(false);
    };


    return (
        <div className={classes.modal_root}>
            <div onClick={handleOpen} >{children}</div>
            <Modal
                id="simple-modal"
                open={isOpened}
                onClose={handleClose}
            >
                <div className={classes.modal_container} >
                    {modalComponent}
                </div>
            </Modal>
        </div>
    );
};

export default ModalGenerator;

ModalGenerator.propTypes = {
    children: PropTypes.node.isRequired,
    modalComponent: PropTypes.node
};