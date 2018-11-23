import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';

class ResultSearch extends Component {
    render() {
        return (
            <div className='ResultSearch'>
                            <Link to='/'>
                    <button>Accueil</button>
                </Link>
                <Loader
                type="ThreeDots"
                color="grey"
                height="200"
                width="200"
            />
            </div>
            
        )
    }
}

export default ResultSearch;