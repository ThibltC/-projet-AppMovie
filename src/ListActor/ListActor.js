import React, { Component } from 'react';

import './ListActor.css'

class ListActor extends Component {

    render() {
        return (
            <div className='ListActor' onClick={_ => this.props.getIdActor(this.props.caracDetails.id)}>
                {this.props.caracDetails.profile_path ?
                    <img src={`https://image.tmdb.org/t/p/w300${this.props.caracDetails.profile_path}`} alt={this.props.caracDetails.name} />
                    :
                    <img src={'https://cdn.browshot.com/static/images/not-found.png'} alt={this.props.caracDetails.name} />
                }
                <p>{this.props.caracDetails.name}</p>
            </div>
        )
    }
}

export default ListActor;
