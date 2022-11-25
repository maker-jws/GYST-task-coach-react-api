import React, { Component } from "react";
import CurrentTime from "../CurrentClock/index";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        username: "",
        login: "",
        logout: "",
        is_active: false
      },
      currentTime: "",
    };
  };
  componentDidMount() {
    this.ClockUpdate = setInterval(() => this.handleClockChange(), 999);
  }
  handleClockChange() {
    const timeNow = new Date().toLocaleString();

    this.setState({
      currentTime: timeNow
    });
  }
  handleAddTaskClick = () => {
    this.props.handleAddTaskClick();
  };

  render() {
    const currentTimeStyle = {
      position: "absolute",
      right: "0",
      paddingTop: "1rem",
      paddingRight: "40px"
    }
    return (
      <div className="ui inverted segment">
        <div className="ui inverted secondary menu">
          <div className="ui inverted secondary menu">
            <div className="active item" role={"navigation"}>
              Home
          </div>
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
          <div className="ui inverted" style={currentTimeStyle}>
            <CurrentTime currentTime={this.state.currentTime} />
          </div>

        </div>

      </div>
    );
  }
}
export default Header;
