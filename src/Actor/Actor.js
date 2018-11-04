import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Actor.css'

class Actor extends Component {
    render() {
        console.log('popo', this.props)
        if (this.props.caracDetails)
            return (
                <Link to={`/actor${this.props.caracDetails.id}`}>
                    <div className='Actor'>
                        {!this.props.caracDetails.profile_path ?
                            <img src={`https://image.tmdb.org/t/p/w300${this.props.caracDetails.profile_path}`} alt={this.props.caracDetails.name} />
                            :
                            <img src={'https://cdn.browshot.com/static/images/not-found.png'} alt={this.props.caracDetails.name} />
                        }
                    </div>
                </Link>

            )
    }
}

export default Actor;
