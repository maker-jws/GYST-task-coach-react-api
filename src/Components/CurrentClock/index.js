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
            <h1>This is the Task Clock</h1>
            <h1>The time is {this.props.currentTime}.</h1>
        </div>);
    }
}

export default CurrentClock;
