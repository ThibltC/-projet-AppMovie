import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import './Response.css'


class Response extends Component {

    // state = {
    //     bool: true,
    //     resultKey: this.props.resultKey
    // }
    // state = {
    //     bool: false
    // }

    // componentDidMount() {
    //     this.setState({bool:!this.state.bool})
    //     console.log('La création du composant a eu lieu');
    // }
    //     componentWillUnmount() {
    //         this.setState({bool:false})


    // console.log('update !')
    //     }

    // refrech = async () => {
    //     if (this.state.resultKey) {
    //         await this.setState({ bool: !this.state.bool })
    //         this.setState({ bool: !this.state.bool })

    //     }
    // }

    render() {
        return (
            <div className="Response" onClick={e => this.props.name(this.props.title)}>
                <Animated animationIn="fadeIn" isVisible={true}>
                    <img src={`https://image.tmdb.org/t/p/w300${this.props.resultKey}`} alt={this.props.title} className='zoom'/>
                </Animated >
            </div>
        );
    }
}

export default Response;