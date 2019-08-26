import React, { Component } from "react";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        username: "",
        login: "",
        logout: "",
        is_active: false
      }
    };
};

  handleAddTaskClick = () => {
    this.props.handleAddTaskClick();
  };

  render() {
    return (
      <div className="ui inverted segment">
        <div className="ui inverted secondary menu">
          <a className="active item" href="#">
            Home
          </a>
          {this.props.currentUser.username ? (
            <a className="item" href="/user/logout">
              Logout
            </a>
          ) : (
            <a className="item" href="/user/login">
              Login
            </a>
          )}
          <a className="item" href="#" onClick={this.handleAddTaskClick}>
            Add Task
          </a>
        </div>
      </div>
    );
  }
}
export default Header;
