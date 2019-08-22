import React, { Component } from 'react';

class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskname: "",
            priority: "",
            saved: false,
            created: "",
            body: "",
            user_id: 1,
            completed: false,
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleNewSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('taskname', this.state.taskname);
        data.append('priority', this.state.priority);
        data.append('body', this.state.body)
        data.append('user_id', this.state.user_id);

        ///for testing
        // console.log(data.json(), ' this is data')
        for (let pair of data.entries()) {
            console.log(pair[0], ', ', pair[1])
        }
        this.props.createTask(data);
        this.setState({
            newTask: {
                taskname: "",
                priority: "",
                saved: false,
                created: "",
                body: "",
                user_id: 1,
                completed: false,
            }
        })
        //clearstate
        // const newTaskCall = this.props.createTask(data);

        // newTaskCall.then((data) => { //This is only needed for a redirect after successfully submitting user 
        //     console.log(data)
        //     if (data.status.message === "Success") {
        //         console.log("succesful returned to container")
        //         //resetState
        //     } else {
        //         console.log(data, ' this should have an error message? How could you display that on the screen')
        //     }
        // })
    }
    render() {
        const formStyle = {
            minWidth: "300px",
            display: "flex",
            flexDirection: "column"
        }
        return (
            <div >
                <h1>New Task</h1>
                <form onSubmit={this.handleNewSubmit} style={formStyle}>
                    <label>
                        Task Name:
            <input type='text' name='taskname' value={this.state.taskname} placeholder="Taskname" onChange={this.handleChange} />
                    </label>

                    <label>
                        Priority:
            <input type='text' name='priority' value={this.state.priority} placeholder="Priority" onChange={this.handleChange} />
                    </label>
                    <label>
                        Description/Notes:
            <input type='text' name='body' value={this.state.body} placeholder="100 words or less" onChange={this.handleChange} />
                    </label>
                    <label>
                        Saved:
            <input type='checkbox' name='checkbox' placeholder="password" />
                    </label>
                    <button type="submit">Add Task</button>
                </form>
            </div>
        )
    };
}
export default CreateTask;


