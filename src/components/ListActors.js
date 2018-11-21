import React, { Component } from 'react';

import './ListActors.css'

class ListActors extends Component {

    render() {
        const { id, profile_path, name } = this.props.caracDetails
        return (
            <div className='ListActors' onClick={_ => this.props.getIdActor(id)}>
                {profile_path ?
                    <img src={`https://image.tmdb.org/t/p/w300${profile_path}`} alt={name} />
                    :
                    <img src={'https://cdn.browshot.com/static/images/not-found.png'} alt={name} />
                }
                <h3>{name}</h3>
            </div>
        )
    }
}

export default ListActors;
