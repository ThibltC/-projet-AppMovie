import React, { Component } from 'react'
import Loader from 'react-loader-spinner';

import './LoaderPage.css'

export default class LoaderPage extends Component {
    render() {
        return (
            <div className='loading'>
                <Loader
                    type="TailSpin"
                    color="grey"
                    height="200"
                    width="200"
                />
            </div>
        )
    }
}
