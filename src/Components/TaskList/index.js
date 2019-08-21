import React, { Component } from 'react';

function TaskList(props) {
    const listStyle = {
        listStyle: "none",
        padding: "1rem",
        display: "flex",
        margin: ".3rem",
        width: "200px",
        minWidth: "150px",
        backgroundColor: "palegoldenrod",
    }
    let taskCount = 0
    const rowStyle = {
        display: "flex",
        flexDirection: "row",
        border: "1px solid black",
        flexWrap: "wrap",
        padding: "1rem",

    }
    const displayTaskList = props.taskList.map((task) => {
        taskCount++

        // const taskListEntries = Object.entries(props.taskList);
        // console.log(taskListEntries);
        return (
            <li key={taskCount} style={listStyle}>
                <p>{task.taskname}</p>
                <p><button>-</button>
                    <button>+</button></p>
            </li>
        )
    })
    return (
        <ul style={rowStyle} className="Task-list-wrapper">{displayTaskList}</ul>
    )
}

export default TaskList;
{/* <span>
                    Priority: {task.priority}
                    Date Created: {task.created}
                    Description: {task.body}
                    Completed: {task.completed}
                </span> */}
