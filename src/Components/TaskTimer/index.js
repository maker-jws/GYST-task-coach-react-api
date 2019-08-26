import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
class TaskTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minute: 25,
            second: "00",
            ms: "00",
            interval: 12,
            isPaused: true,
            restCount: 0,
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
            this.restTimer();
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
    restTimer() {
        if (this.state.restCount < 4) {
            this.setState({
                minute: "05",
                second: "20",
                ms: "00",
                restCount: this.state.restCount + 1
            })
        }
        else {
            this.setState({
                minute: "15",
                second: "00",
                ms: "00",
                restCount: 0

            })
        }
        this.startTimer()
    }
    resetTimer() {
        clearInterval(this.updateClock);
        this.setState({
            minute: 0,
            second: 20,
            ms: "00",
            interval: 12
        })
    }
    render() {
        const digitStyle = {
            fontSize: "120pt",
            fontWeight: "200",
            lineHeight: "140pt",
        }
        const bottomMargin = {
            marginBottom: "1rem"
        }
        const minDisp = this.state.minute
        const secDisp = this.state.second
        const msDisp = this.state.ms
        return (
            <div style={bottomMargin}>
                <h3><span style={digitStyle}>{minDisp}:</span><span style={digitStyle}>{secDisp}</span>
                    <span><h1>with {this.state.restCount} rests</h1> </span></h3>

                <button className="mini ui green button" onClick={this.startTimer}>start</button>
                <button className="mini ui red button" onClick={this.stopTimer}>stop</button>
                <button className="mini ui yellow button" onClick={this.resetTimer}>reset</button>
            </div>);
    }
}

export default TaskTimer;
