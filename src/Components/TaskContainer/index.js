import React, { Component } from 'react';
import CreateTask from '../CreateTask/index';
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
                email: "",
                login: "",
                logout: "",
            },
            isLogged: false,
            newTask: {
                taskname: "",
                priority: "",
                saved: false,
                created: "",
                body: "",
                user_id: this.state.currentUser.user_id,
                completed: false,
            },
            taskToDelete: {
                taskname: "",
                priority: "",
                saved: false,
                created: "",
                body: "",
                user_id: this.state.currentUser.user_id,
                completed: false,
            },
            taskToEdit: {
                taskname: "",
                priority: "",
                saved: false,
                created: "",
                body: "",
                user_id: this.state.currentUser.user_id,
                completed: false,
            },
        }
    }
    componentDidMount() {
        console.log('state did change');
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
            const responseGetTasks = await fetch('...', {
                method: "GET",
                credentials: 'include',
            });

            if (responseGetTasks.status !== 200) {
                throw Error("Error 404 from Server")
            } else {
                const tasksResponse = await responseGetTasks.json();
                console.log(tasksResponse, 'tasks response');
                this.setState({
                    tasks: [...tasksResponse.data]
                })
                //console.log(this.state.tasks, 'after spread')
            }
        } catch (err) {
            console.log(err, 'getTasks Error');
        }
    }
    render() {
        return (
            <main>
                <h1>This is the Task Container</h1>
                <CreateTask />
            </main>
        );
    }
}

export default TaskContainer;