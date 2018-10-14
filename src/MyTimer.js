import React, { Component } from 'react';

class Mytimer extends Component {

    state = {
        cpt: 0
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                cpt: this.state.cpt + 1
            });
            console.log(this.state.cpt);
        },
            1000);
    }
    componentWillUpdate() {
        console.log("Un update à eu lieu");
    }

    render() {
        return (
            <div>
                <h1>{this.state.cpt}</h1>
            </div>
        );
    }
}

export default Mytimer;