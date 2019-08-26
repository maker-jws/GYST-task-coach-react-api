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
            currentUser: {
                user_id: 0,
                username: "",
                name: "",
                email: "",
                login: "",
                logout: "",
            },
            isLogged: false,
            taskToEdit: {
                taskname: "",
                priority: "",
                saved: false,
                created: "",
                body: "",
                user_id: "",
                id: 0,
                completed: false,
            },
            currentTime: "",
            taskDuration: 25,
            showEditModal: false,
            showCreateModal: false,
        }
    }
    componentDidMount() {
        console.log('state did change');
        this.getTasks();
        this.ClockUpdate = setInterval(
            () => this.handleClockChange(),
            999
        );
        this.setState({
            showCreateModal: this.props.displayCreateModal
        })
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
    componentDidUpdate() {
        if (this.state.showCreateModal !== this.props.displayCreateModal) {
            this.setState({
                showCreateModal: this.props.displayCreateModal
            })
        }
    }
    handleClockChange() {
        const timeNow = new Date().toLocaleString()
        // const timeMS = Date.parse(timeNow)
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
    // getCurrentUser = async () => {
    //     try {
    //         console.log('getCurrentUser Fired')
    //         //this.setState({
    //         //this.props.currentUser //getting app.js
    //         //islogged: !this.state.isLogged
    //         // })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
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

    displayEditModal = async (task) => {
        try {
            console.log(task, "this is the task");
            console.log(task.taskname)
            this.setState({
                taskToEdit: task,
                showEditModal: !this.state.showEditModal
            })
            console.log(this.state.taskToEdit, 'this is after setting state');
        } catch (err) {
            console.log(err);
        }

    }
    editTask = async (form_data) => {

        try {
            console.log(form_data);
            this.setState(
                { taskToEdit: { ...form_data } }
            )
            console.log(this.state.taskToEdit)

            const getOneTask = await fetch('http://localhost:8000/task/v1/' + this.state.taskToEdit.id, { //insert id here
                method: 'PUT',
                credentials: 'include',
                body: form_data,
                headers: {
                    'enctype': 'multipart/form-data',
                }
            });
            console.log(getOneTask)
            const editResponse = await getOneTask.json()
            if (editResponse.status.code !== 200) {
                throw Error('Request is not working')
            }

            console.log(editResponse, 'return from db');

            const editedtasks = this.state.tasks.map(task => {
                if (task.id === editResponse.data.id) {
                    task = editResponse.data
                    console.log(task);
                    return task;
                } else {
                    return task;
                }

            })
            this.setState({
                tasks: editedtasks,
                showEditModal: false
            });
            console.log(editedtasks, 'editedtasks')
            return editedtasks
        }
        catch (err) {
            console.log(err, 'this is the edit error');
            return err;
        };
    }
    deleteTask = async (id) => {
        console.log(id, ' delete task ID')

        try {

            const deleteTask = await fetch('http://localhost:8000/task/v1/' + id, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json' //may not need 
                }
            });


            if (deleteTask.status !== 200) {
                throw Error('Something happened on delete')
            }

            // this object is the actual response from the api
            const deleteTaskJson = await deleteTask.json();

            this.setState({
                tasks: this.state.tasks.filter((task) => task.id !== id)
            })


        } catch (err) {
            console.log(err);
            return err
        }
    }

    render() {
        const flexStyle = {
            "display": "flex",
            "justifyContent": "space-between",
            // "border": "1px solid black",
            "flexDirection": "row",
            // "flexWrap": "wrap",
        }
        return (
            <main>
                <div><TaskTimer /></div>
                <div style={flexStyle}>
                    <TaskList taskList={this.state.tasks} displayEditModal={this.displayEditModal} deleteTask={this.deleteTask} />
                    {this.state.showCreateModal === true ? <CreateTask currentUserId={this.state.currentUser} createTask={this.addTask} /> : null}
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
