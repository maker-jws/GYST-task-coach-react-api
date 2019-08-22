import React, { Component } from 'react';
import { thisExpression } from '@babel/types';

class EditTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskname: this.props.taskToEdit.taskname,
            priority: this.props.taskToEdit.priority,
            saved: this.props.taskToEdit.saved,
            created: this.props.taskToEdit.created,
            body: this.props.taskToEdit.body,
            user_id: this.props.taskToEdit.user_id,
            completed: this.props.taskToEdit.completed,
            id: this.props.taskToEdit.id,
        }
    }
    handleChange = (e) => {
        // console.log(e.target.value)
        this.setState(
            { [e.target.name]: e.target.value }
        );
    }
    handleNewEdit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('id', this.state.id)
        data.append('taskname', this.state.taskname);
        data.append('priority', this.state.priority);
        data.append('created', this.state.created)
        data.append('body', this.state.body)
        data.append('user_id', this.state.user_id);
        ///for testing
        console.log(data, 'this is the data')
        for (let key of data.entries()) {
            console.log(key[0], ', ', key[1])
        }
        this.props.editTask(data);
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
        return (
            <div>
                <h1>Edit Task</h1>
                <form onSubmit={this.handleNewEdit}>
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
                    <button type="submit">Edit Task</button>
                </form>
            </div>
        )
    };
}
export default EditTask;