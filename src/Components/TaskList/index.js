import React, { Component } from 'react';
import { setPriority } from 'os';
// import { List, Segment, Button } from 'semantic-ui-react'

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  setPriorityStyle = (task) => {
    const highPriorityStyle = {
      border: "red solid 2px"
    }
    const medPriorityStyle = {
      border: "goldenrod solid 2px"
    }
    const lowPriorityStyle = {
      border: "lightgreen solid 2px"
    }
    const zeroPriorityStyle = {
      border: "lightblue solid 1px"
    }

    if (task.priority === "high") {
      return highPriorityStyle
    } else if (task.priority === "medium") {
      return medPriorityStyle
    } else if (task.priority === "low") {
      return lowPriorityStyle
    } else if (task.priority !== null) {
      return zeroPriorityStyle
    }
  }
  render() {
    let taskCount = 0


    const displayTaskList = this.props.taskList.map((task) => {
      taskCount++
      return (
        <div className="ui inverted segment" key={taskCount} style={this.setPriorityStyle(task)}>
          <div role="list" className="ui divided inverted relaxed list">
            <div role="listitem" className="item">
              <div className="content">
                <div className="header">{task.taskname}</div>
                Priority: {task.priority}
                <div>
                  Description: {task.body}
                </div> <br />
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





