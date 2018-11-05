import React, { Component } from 'react';
import './SearchBar.css'

class SearchBar extends Component {

    render() {
        return (
            <form autoComplete="off" className='SearchBar'>
                <input
                    type="text"
                    placeholder="Ex: Batman"
                    value={this.props.inputSearchMovie}
                    onChange={e => this.props.changeInput(e)}
                />
            </form>
        )
    }
}

export default SearchBar;
