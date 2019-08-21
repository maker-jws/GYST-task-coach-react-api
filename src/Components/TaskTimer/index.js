import React, { Component } from 'react';
class TaskTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }
    startTimer() {
        console.log('start')
    }
    stopTimer() {
        console.log('stop')
    }
    resetTimer() {
        console.log('reset')
    }
    render() {
        return (
            <div>
                <h3>timer: 'time display will be here'</h3>
                <button onClick={this.startTimer}>start</button>
                <button onClick={this.stopTimer}>stop</button>
                <button onClick={this.resetTimer}>reset</button>
            </div>
        );
    }
}

export default TaskTimer;