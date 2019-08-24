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
        is_active: false
      },
      showRegister: false,
      showLogin: false,
      showAddTask: true,
    };
  }
  headerAddTask = () => {
    this.setState({
      showAddTask: !(this.state.showAddTask)
    })
    console.log('task button pressed>>>effect:', this.state.showAddTask);
  }
  checkAddTaskState = () => {
    const currentModalState = this.state.showAddTask
    console.log(this.props.ModalState)
    console.log('this.checkAddTaskState called')
    return currentModalState
  }
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

      const parsedLogin = await login.json();
      console.log(parsedLogin, " < login response");
      if (parsedLogin.status.message === "Success") {
        console.log("logged in");
        this.setState({
          currentUser: {
            username: data.username,
            login: new Date().toLocaleString(),
            is_active: true
          }
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
        console.log(data);
        this.setState({
          currentUser: {
            username: data.username,
            login: new Date().toLocaleString(),
            is_active: true
          }
        });
        console.log(this.state.currentUser);
        // this.props.history.push("/employees");
      }
    } catch (err) {
      console.log(err);
    }
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
        <Header handleLogoutSubmit={this.handleLogoutClick} handleAddTaskClick={this.headerAddTask} />
        {this.state.currentUser.username ? (
          <TaskContainer displayCreateModal={!this.state.showAddTask} />) : (
            <div>
              <Login handleLoginSubmit={this.handleLoginSubmit} />
              <Register registerSubmit={this.handleRegisterSubmit} />
            </div>
          )}
      </div>
    );
  }
}

export default App;

// not using switch until all functionality is in place -- then drop into routes.
// const My404 = () => {
//   return (
//     <div>
//       You are lost
//     </div>
//   )
// }
//Login Function passing props to Login Component inside header
//Register Function passing props to Register Component inside header
//Logout Function writing to database -

