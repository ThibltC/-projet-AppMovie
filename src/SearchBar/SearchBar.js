import React, { Component } from 'react';
import './SearchBar.css'

class SearchBar extends Component {

    render() {
        return (
            <form autoComplete='off' className='SearchBar'>
                <input
                    type='text'
                    placeholder={`Entrer le nom d'un film`}
                    value={this.props.inputSearch}
                    onChange={e => this.props.changeInput(e)}
                />
            </form>
        )
    }
}

export default SearchBar;
