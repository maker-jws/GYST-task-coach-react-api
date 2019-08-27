import React, { Component } from 'react';
class CurrentClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: new Date().toLocaleString()
        }
    }
    render() {
        const currentParsedDate = this.props.currentTime;
        const currentTime = currentParsedDate.toLocaleString();
        return (<div>
            <h3>The day is {currentTime}.</h3>
        </div>);
    }
}
export default CurrentClock;
