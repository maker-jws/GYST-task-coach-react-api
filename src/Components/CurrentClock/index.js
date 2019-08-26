import React, { Component } from 'react';
class CurrentClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: new Date().toLocaleString()
        }
    }

    render() {
        return (<div>
            <h3>The day is {this.props.currentTime}.</h3>
        </div>);
    }
}

export default CurrentClock;
