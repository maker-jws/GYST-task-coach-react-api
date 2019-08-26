import React, { Component } from 'react';
import { List, Segment, Button } from 'semantic-ui-react'

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let taskCount = 0
        // const listStyle = {
            // listStyle: "none",
            // padding: "1rem",
            // display: "flex",
            // margin: ".3rem",
            // width: "200px",
            // minWidth: "150px",
            // backgroundColor: "palegoldenrod",
        // }
        // const rowStyle = {
        //     display: "flex",
        //     flexDirection: "row",
        //     border: "1px solid black",
        //     flexWrap: "wrap",
        //     padding: "1rem",
        // }
        const displayTaskList = this.props.taskList.map((task) => {
            taskCount++
            return (
                <div className="ui inverted segment" key={taskCount}>
                  <div role="list" class="ui divided inverted relaxed list">
                    <div role="listitem" className="item">
                      <div className="content">
                        <div class="header">{task.taskname}</div>
                        Priority: {task.priority} 
                        <div>
                        Description: {task.body}
                        </div> <br/>
                        <div>
                        <p><button className="mini ui red button" onClick={this.props.deleteTask.bind(null, task.id)}>Del</button>
                        <button className="mini ui button" onClick={this.props.displayEditModal.bind(null, task)}>Edit</button></p>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
            )
        })

        return (
            <ul> {displayTaskList} </ul>
        )
    }
}
export default TaskList;





