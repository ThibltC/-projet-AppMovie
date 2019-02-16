import React, { Component } from 'react'
import { connect } from 'react-redux';

import './MovieResume.css'

class MovieResume extends Component {
    render() {
        const { overview } = this.props.movieDetails
        return (
            <div className='MovieResume'>
                {overview ? <p>{overview}</p> : <p>Pas de résumé...</p>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    movieDetails: state.movieData.movieDetails,
})

export default connect(mapStateToProps, {})(MovieResume)