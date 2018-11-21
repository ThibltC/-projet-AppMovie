import React, { Component } from 'react';
import './SearchBar.css'

class SearchBar extends Component {

    render() {
        return (
            <div className='SearchBar'>
                <input
                    type='text'
                    placeholder={`Entrer le nom d'un film`}
                    value={this.props.inputSearch}
                    onChange={e => this.props.changeInput(e)}
                />
            </div>

        )
    }
}

export default SearchBar;
