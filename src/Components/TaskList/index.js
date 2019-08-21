import React, { Component } from 'react';

function TaskList(props) {
    const listStyle = {
        listStyle: "none",
        padding: "1rem",
    }

    const displayTaskList = props.taskList.map((task) => {
        // const taskListEntries = Object.entries(props.taskList);
        // console.log(taskListEntries);
        return (
            <li key={task.user_id} style={listStyle}>
                <h1>{task.taskname} </h1>
                <span>
                    Priority: {task.priority}
                    Date Created: {task.created}
                    Description: {task.body}
                    Completed: {task.completed}
                </span>
                <span style={listStyle}>
                    <button>Complete</button>
                    <button>Add Notes</button>
                </span>
            </li>
        )
    })
    return (
        <div className="Task-list-wrapper">{displayTaskList}</div>
    )
}

export default TaskList;
