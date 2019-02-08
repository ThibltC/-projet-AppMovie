import React, { Component } from 'react'

import logo from './pink_donut_-_2_-512.png';

import './HeaderMini.css'

export default class HeaderMini extends Component {
    render() {
        return (
            <div className='HeaderMini'>
                <img src={logo} className="Mini-logo" alt="logo" />
                <h1>Donuts Movies</h1>
            </div>
        )
    }
}
