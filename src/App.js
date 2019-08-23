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
      showLogin: false
    };
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
          // 'enctype': 'multipart/form-data',
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

  render() {
    return (
      <div className="App">
        <Header />
        {this.state.currentUser.username}
        <TaskContainer />
        <div>
          <Login handleLoginSubmit={this.handleLoginSubmit} />
          <Register registerSubmit={this.handleRegisterSubmit} />
        </div>
        }
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

// register = async (data) => {
//   try {

//     const registerResponse = await fetch('http://localhost:8000/user/register', {
//       method: 'POST',
//       credentials: 'include',// on every request we have to send the cookie
//       body: data,
//       headers: {
//         'enctype': 'multipart/form-data'
//       }
//     })

//     const parsedResponse = await registerResponse.json();

//     console.log(parsedResponse)

//     this.setState({
//       ...parsedResponse.data,
//       loading: false
//     })
//     return parsedResponse;

//   } catch (err) {
//     console.log(err)
//   }
// }
