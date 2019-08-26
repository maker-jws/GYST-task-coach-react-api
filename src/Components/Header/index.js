import React, { Component } from "react";
class Header extends Component {
  constructor(props) {
    super(props);
  const headerStyle = {
 
  handleAddTaskClick = () => {
    this.props.handleAddTaskClick()
  }
  render() {
    return (<div className="ui inverted segment">
      <div className="ui inverted secondary menu">
        <a className="active item" href="#">
          Home
      </a>
        <a className="item" href="#" onClick={this.handleAddTaskClick}>
          Add Task
      </a>
        <a className="item" href="/user/logout">
          Logout
      </a>
      </div>
    </div>);
  }
}
export default Header;

