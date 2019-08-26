import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
// import { Route, Switch } from 'react-router-dom';
import TaskContainer from "./Components/TaskContainer/index";
import Header from "./Components/Header/index";
import Register from "./Components/Register/index";
import Login from "./Components/Login/index";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {
        username: "",
        login: "",
        logout: "",
        is_active: false,
        user_id: 0
      },
      showRegister: false,
      showLogin: false,
      showAddTask: true,
      notRegistered: false
    };
  }

  headerAddTask = () => {
    this.setState({
      showAddTask: !this.state.showAddTask
    });
    console.log("task button pressed>>>effect:", this.state.showAddTask);
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleLoginSubmit = async data => {
    try {
      console.log(JSON.stringify(data));
      const login = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      //need a route to get the user in the post with a then?
      const parsedLogin = await login.json(); //this returns data with user ID
      console.log(parsedLogin, " < login response");
      if (parsedLogin.status.message === "Success") {
        console.log("logged in");
        this.setState({
          currentUser: {
            username: parsedLogin.data.username,
            login: new Date().toLocaleString(),
            is_active: true,
            user_id: parsedLogin.data.id
          },
          notRegistered: false
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  handleRegisterSubmit = async data => {
    try {
      console.log(data);
      const register = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const parsedRegister = await register.json();
      console.log(parsedRegister, " response from register");
      if (parsedRegister.status.message === "Success") {
        console.log("logged in");
        console.log(parsedRegister); // this is what comes back from the server
        this.setState({
          currentUser: {
            username: parsedRegister.data.username,
            login: new Date().toLocaleString(),
            is_active: true,
            user_id: parsedRegister.data.id
          },
          notRegistered: false
        });
        console.log(this.state.currentUser);
        // this.props.history.push("/employees");
      }
    } catch (err) {
      console.log(err);
    }
  };
  setNotRegistered = () => {
    this.setState({
      notRegistered: true
    });
  };
  // handleLogoutClick = async (data) => {
  //   //posting to db : username and logout time
  //   //store something in data variables
  //   try {
  //     console.log(JSON.stringify(data));
  //     const logout = await fetch("http://localhost:8000/user/logout", {
  //       method: "POST",
  //       credentials: "include",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });

  //     const parsedLogout = await logout.json();
  //     console.log(parsedLogout, " < logout response");
  //     if (parsedLogout.status.message === "Success") {
  //       console.log("logged out");
  //       //after logout successful from server, will reset state
  //       this.setState({
  //         currentUser: {
  //           username: "data.username",
  //           login: "",
  //           is_active: false
  //         }
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  render() {
    return (
      <div className="App">
        <Header
          handleLogoutSubmit={this.handleLogoutClick}
          handleAddTaskClick={this.headerAddTask}
          {...this.state}
        />
        {this.state.currentUser.username ? (
          <TaskContainer
            displayCreateModal={!this.state.showAddTask}
            currentTaskUser={this.state.currentUser}
          />
        ) : (
          <div>
            {this.state.notRegistered ? (
              <Register registerSubmit={this.handleRegisterSubmit} />
            ) : (
              <Login
                setNotRegistered={this.setNotRegistered}
                handleLoginSubmit={this.handleLoginSubmit}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
