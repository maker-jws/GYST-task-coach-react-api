import React, { Component } from 'react';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let taskCount = 0
        const listStyle = {
            listStyle: "none",
            padding: "1rem",
            display: "flex",
            margin: ".3rem",
            width: "200px",
            minWidth: "150px",
            backgroundColor: "palegoldenrod",
        }
        const rowStyle = {
            display: "flex",
            flexDirection: "row",
            border: "1px solid black",
            flexWrap: "wrap",
            padding: "1rem",
        }

        const displayTaskList = this.props.taskList.map((task) => {
            taskCount++
            // const taskListEntries = Object.entries(props.taskList);
            // console.log(taskListEntries);
            return (
                <li key={taskCount} style={listStyle}>
                    <p>{task.taskname}</p>
                    <p><button onClick={this.props.deleteTask.bind(null, task._id)}>Del</button>
                        <button onClick={this.props.displayEditModal.bind(null, task)}>Edit</button></p>
                </li>
            )
        })

        return (
            <ul style={rowStyle} className="Task-list-wrapper" > {displayTaskList}</ul>
        )
    }
}
export default TaskList;

