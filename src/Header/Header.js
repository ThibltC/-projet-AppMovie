import React from 'react';
import logo from './logo.svg';
import './Header.css';

const Header = props => {
    return (
        <header className="Header">
            <img src={logo} className="Header-logo" alt="logo" />
            <p>App Movies</p>
        </header>
    )
}

export default Header;