import React, { Component } from 'react';
class TaskTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minute: 25,
            second: "00",
            ms: "00",
            interval: 12,
            isPaused: true,
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        console.log(this)
    }
    componentDidMount() {

    }
    changeTaskClock() {
        this.setState({ ms: this.state.ms - 1 })
        if (this.state.ms < 0) {
            // console.log('this is being activated MS')
            this.setState({
                ms: 100,
                second: this.state.second - 1,
            })
        } else if (this.state.second <= 0) {
            // console.log('this is being activated SEC/MIN')
            this.setState({
                second: 59,
                minute: this.state.minute - 1,
            })
        } else if (this.state.minute < 0) {
            // console.log('this is being activated TIMEOUT')
            //initate taskcontainer state tasks shuffle
            clearInterval(this.updateClock);
        }
    }
    startTimer() {
        this.updateClock = setInterval(() => {
            this.changeTaskClock();
            // if (this.state.ms === 0) { console.log(this.state) } //- This is working 
        }, 12);
        console.log(this.state.second)
    }
    storeTime() {
        const minStore = this.state.minute
        const secStore = this.state.second
        const msStore = this.state.ms
        const timeArray = [minStore, secStore, msStore]
        console.log(timeArray);
        return timeArray;
    }
    stopTimer() {
        const currentVals = this.storeTime();
        console.log(currentVals)
        clearInterval(this.updateClock)
        if (this.state.isPaused === false) {
            clearInterval(this.updateClock)
            console.log(this.state.isPaused, 'signaled if false')
            this.setState({
                minute: currentVals[0],
                second: currentVals[1],
                ms: currentVals[2],
            })
            this.componentDidMount();
        }
        this.setState({
            isPaused: !this.state.isPaused
        })

    }
    resetTimer() {
        clearInterval(this.updateClock);
        this.setState({
            minute: 25,
            second: "00",
            ms: "00",
            interval: 12
        })
    }
    render() {
        const minDisp = this.state.minute
        const secDisp = this.state.second
        const msDisp = this.state.ms
        return (
            <div>
                <h3><span>{minDisp}</span>:<span>{secDisp}</span>:<span>{msDisp}</span>   minutes remaining</h3>
                <button onClick={this.startTimer}>start</button>
                <button onClick={this.stopTimer}>stop</button>
                <button onClick={this.resetTimer}>reset</button>
            </div>
        );
    }
}

export default TaskTimer;
