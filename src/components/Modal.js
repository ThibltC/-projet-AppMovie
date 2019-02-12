import React, { Component } from 'react';
import MovieResume from './MovieResume'
import './Modal.css';

class Modal extends Component {

    state = {
        showModal: false,
    }

    openModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        const { showModal } = this.state
        const modalDisplay = showModal ? 'modal-actived' : 'modal-desactived'
        return (
            <div className="Modal">

                <button type="button" onClick={this.openModal}>Résumé</button>

                <div className={modalDisplay}>
                    <div className='backgroundModal' >
                        <div className='modalDIY animated fadeInDownBig faster'>
                            <div className='modalHeader'>
                                <button className="close" onClick={this.openModal}>
                                    <span>&times;</span>
                                </button>
                                <h3>Résumé</h3>
                            </div>
                            <MovieResume />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Modal;
