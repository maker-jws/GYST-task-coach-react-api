import React, { Component } from 'react';
class TaskTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }
    createTarget = () => {

        let targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 10);

        // So you can see the date we have created
        alert(targetDate);

        const dd = targetDate.getDate();
        const mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
        const yyyy = targetDate.getFullYear();

        const dateString = dd + "/" + mm + "/" + yyyy;

        // So you can see the output
        alert(dateString);
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