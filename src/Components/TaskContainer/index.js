import React, { Component } from 'react';
import CreateTask from '../CreateTask/index';
import TaskList from '../TaskList/index';
import CurrentTime from '../CurrentClock/index';
import TaskTimer from '../TaskTimer/index'

class TaskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            currentUser: {
                user_id: 0,
                username: "",
                name: "",
                email: "",
                login: "",
                logout: "",
            },
            isLogged: false,
            currentTime: "",
            taskDuration: 25,
        }
    }
    componentDidMount() {
        console.log('state did change');
        this.getTasks();
        this.ClockUpdate = setInterval(
            () => this.handleClockChange(),
            999
        );
    }
    addTask = async (data) => {
        try {
            const createTaskResponse = await fetch('http://localhost:8000/task/v1/', {
                method: 'POST',
                credentials: 'include',
                body: data,
                headers: {
                    'enctype': 'multipart/form-data',
                }
            });

            const parsedResponse = await createTaskResponse.json();
            console.log(parsedResponse, 'parsed response', '<<<successful created event')

            return parsedResponse;
        }
        catch (err) {
            console.log(err)
        }
    }
    // Need to dicuss how we will display tasks / edit events/ 

    handleClockChange() {
        const timeNow = new Date().toLocaleString()
        const timeMS = Date.parse(timeNow)
        this.setState({
            currentTime: timeNow
        });
    }
    handleFormChange = (e) => {
        //will help us edit the state for modified tasks component
        this.setState({
            taskToEdit: {
                ...this.state.taskToEdit,
                [e.target.name]: e.target.value
            }
        })
    }
    getTasks = async () => {
        try {
            const responseGetTasks = await fetch('http://localhost:8000/task/v1/', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (responseGetTasks.status !== 200) {
                throw Error("Error 404 from Server")
            } else {
                const tasksResponse = await responseGetTasks.json();
                console.log(tasksResponse, 'tasks response');
                this.setState({
                    tasks: [...tasksResponse.data]
                })
                console.log(this.state.tasks, 'after spread')
            }
        } catch (err) {
            console.log(err, 'getTasks Error');
        }
    }
    render() {
        const flexStyle = {
            "display": "flex",
            "justifyContent": "space-between",
            "border": "1px solid black",
            "flexDirection": "row",
            // "flexWrap": "wrap",
        }
        return (
            <main>
                <div><TaskTimer /></div>
                <div style={flexStyle}>
                    <div><TaskList taskList={this.state.tasks} /></div>
                    <div><CreateTask createTask={this.addTask} /></div>
                </div>
                <div><CurrentTime currentTime={this.state.currentTime} /></div>

            </main >
        );
    }
}

export default TaskContainer;

// taskToDelete: {
            //     taskname: "",
            //     priority: "",
            //     saved: false,
            //     created: "",
            //     body: "",
            //     user_id: "",
            //     completed: false,
            // },
            // taskToEdit: {
            //     taskname: "",
            //     priority: "",
            //     saved: false,
            //     created: "",
            //     body: "",
            //     user_id: "",
            //     completed: false,
            // },