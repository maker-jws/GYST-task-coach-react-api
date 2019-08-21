import React, { Component } from 'react';
import CreateTask from '../CreateTask/index';
import TaskList from '../TaskList/index'
// import MovieList from '../MovieList/index'
// import EditMovie from '../EditMovie/index'

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
        }
    }
    componentDidMount() {
        console.log('state did change');
        this.getTasks();

    }
    addTask = async (data) => {
        try {
            const createTaskResponse = await fetch('http://localhost:8000/task/v1/', {
                method: 'POST',
                credentials: 'include',
                body: data,
                headers: {
                    'enctype': 'multipart/form-data',
                    'Access-Control-Allow-Origin': true
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
    handleFormChange = (e) => {   //will help us edit the state for modified tasks component
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
            "border": "1px solid black"
        }
        return (
            <main>
                <h1>This is the Task Container Component</h1>
                <div style={flexStyle}>
                    <TaskList taskList={this.state.tasks} />
                    <CreateTask createTask={this.addTask} />
                </div>
            </main>
        );
    }
}

export default TaskContainer;