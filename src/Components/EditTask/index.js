import React, { Component } from 'react';

// import { thisExpression } from '@babel/types';
// import { Form, Input, TextArea, Button } from 'semantic-ui-react'



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

    handleChange = (e) => {
        this.setState(
            { [e.target.name]: e.target.value }
        );
        console.log(this.state.priority)

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
    // console.log(data, 'this is the data')
    for (let key of data.entries()) {
      console.log(key[0], ', ', key[1])

    }
    this.props.editTask(data);
  }
  render() {
    const editStyle = {
        paddingInlineStart: "40px",
        paddingInlineEnd: "40px"
        }
    const radio = {
        display: "flex",
        flexDirection: "row", 
        }
  return (
<form className="ui form" onSubmit={this.handleNewEdit} style={editStyle}>
<h1>Edit Task</h1>
  <div className="equal width fields">
    <div className="field">
      <label for="form-subcomponent-shorthand-input-task-name"></label>
      <div className="ui fluid input">
        <input
          type="text"
          id="form-subcomponent-shorthand-input-task-name"
          placeholder={this.state.taskname}
          name='taskname' 
          value={this.state.taskname}  
          onChange={this.handleChange}
        />
      </div>
    </div>
    <div className="field">
      <label for="form-subcomponent-shorthand-input-description"></label>
      <div className="ui fluid input">
        <input
          type="text"
          id="form-subcomponent-shorthand-input-description"
          placeholder={this.state.body}
          name='body' 
          value={this.state.body} 
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
    <button className="ui button" type="submit">Edit Task</button>
  </div>

</form>



    )
  };
}

export default EditTask;