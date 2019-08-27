
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
      user_id: this.props.currentUserId,
      completed: false,
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleNewSubmit = e => {
    e.preventDefault();

    const data = new FormData();
    data.append("taskname", this.state.taskname);
    data.append("priority", this.state.priority);
    data.append("body", this.state.body);
    data.append("user_id", this.state.user_id);

    ///for testing
    // console.log(data.json(), ' this is data')
    for (let pair of data.entries()) {
      console.log(pair[0], ", ", pair[1]);
    }
    // this.props.createTask(data);
    // clearState
    
    const newTaskCall = this.props.createTask(data);
    newTaskCall.then(data => {
      console.log(data, "new task data!");
      if (data.status.message === "Success") {
        console.log("succesful returned to container");
        this.setState({
          taskname: "",
          priority: "",
          saved: false,
          created: "",
          body: "",
          user_id: this.props.currentUserId, //pass in this.props.currentUserId
          completed: false
        });
      } else {
        console.log(
          data,
          " this should have an error message? How could you display that on the screen"
        );
      }
    });
  };
  render() {
    const formStyle = {
      paddingInlineStart: "40px",
      paddingInlineEnd: "40px"
    }
    const radio = {
    display: "flex",
    flexDirection: "row", 
    }
    return ( 
      <form
        className="ui form"
        onSubmit={this.handleNewSubmit}
        style={formStyle}
      >
        <h1>Add a Task</h1>
        <div className="equal width fields">
          <div className="field">
            <label for="form-subcomponent-shorthand-input-task-name"></label>
            <div className="ui fluid input">
              <input
                type="text"
                id="form-subcomponent-shorthand-input-task-name"
                placeholder="Task name"
                name="taskname"
                value={this.state.taskname}
                onChange={this.handleChange}
              />
            </div>
          </div>


          <div class="field">
            <label for="form-subcomponent-shorthand-input-description"></label>
            <div className="ui fluid input">
              <input
                type="text"
                id="form-subcomponent-shorthand-input-description"
                placeholder="Description"
                name="body"
                value={this.state.body}
                placeholder="Description - 100 words or less"
                onChange={this.handleChange}
              />
            </div>
          </div>




          
          <div className="grouped fields" style={radio} onChange={this.handleChange}>
        <label>Priority</label>
        <div className="field">
          <label>
            <input 
                type="radio" 
                name="priority" 
                value="high" 
                onChange={this.handleChange}/>
            High
          </label> 
        </div>
        <div className="field">
          <label>
            <input type="radio" name="priority" value="medium" onChange={this.handleChange}/>
            Medium
          </label>
        </div> 
        <div className="field">
          <label>
            <input type="radio" name="priority" value="low" onChange={this.handleChange}/>
            Low
          </label>
        </div> 
    </div>


          <button className="ui button" type="submit">
            Add Task
          </button>
        </div>
      </form>
    )
  };
}

export default CreateTask;
