import React, { Component } from 'react';
import CreateTask from '../CreateTask/index';
import TaskList from '../TaskList/index';
import EditTask from '../EditTask/index'
import CurrentTime from '../CurrentClock/index';
import TaskTimer from '../TaskTimer/index'

class TaskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            showEditModal: false,
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
            taskToEdit: {
                taskname: "",
                priority: "",
                saved: false,
                created: "",
                body: "",
                user_id: "",
                completed: false,
            },
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
    displayEditModal = (task) => {
        console.log(this.state.taskToEdit, 'this is the state');
        console.log(task, "this is the task");
        this.setState({
            taskToEdit: { ...task },
            showEditModal: !this.state.showEditModal
        })
        console.log(this.state.taskToEdit, 'this is after setting state');
    }
    editTask = async (e) => {
        e.preventDefault();
        try {
            const getOneTask = await fetch('http://localhost:8000/task/v1/' + this.state.taskToEdit.taskname, { //insert id here
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(this.state.employeeToEdit),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (getOneTask !== 200) {
                throw Error('Request is not working')
            }
            const editResponse = await getOneTask.json()
            const editedtasks = this.state.tasks.map(task => {
                if (task.taskname == editResponse.data.taskname) {
                    task = editResponse.data
                    return task;
                }
                this.setState({
                    tasks: editedtasks,
                    showEditModal: false
                });
                console.log(editResponse)
            })
        }
        catch (err) {
            console.log(err, 'this is the edit error');
            return err;
        };
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
                    <TaskList taskList={this.state.tasks} editTask={this.editTask} getTaskToEdit={this.getTaskToEdit} displayEditModal={this.displayEditModal} />
                    <CreateTask createTask={this.addTask} />
                    {this.state.showEditModal === true ?
                        <EditTask
                            editTask={this.editTask}
                            handleFormChange={this.handleFormChange}
                            taskToEdit={this.state.taskToEdit} /> : null}
                </div>
                <div><CurrentTime currentTime={this.state.currentTime} /></div>
            </main >
        );
    }
}

export default TaskContainer;
