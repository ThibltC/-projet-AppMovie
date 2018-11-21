import React, { Component } from 'react';

import './ListActors.css'

class ListActors extends Component {

    render() {
        return (
            <div className='ListActors' onClick={_ => this.props.getIdActor(this.props.caracDetails.id)}>
                {this.props.caracDetails.profile_path ?
                    <img src={`https://image.tmdb.org/t/p/w300${this.props.caracDetails.profile_path}`} alt={this.props.caracDetails.name} />
                    :
                    <img src={'https://cdn.browshot.com/static/images/not-found.png'} alt={this.props.caracDetails.name} />
                }
                <h3>{this.props.caracDetails.name}</h3>
            </div>
        )
    }
}

export default ListActors;
