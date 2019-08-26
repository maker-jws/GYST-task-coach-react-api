import React, { Component } from "react";
// import { Link } from "react-router-dom";
import logo_bk from '../../img/logo_bk.png'
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  handleLoginSubmit = async e => {
    e.preventDefault();
    console.log(this.state.username, " tried to login");
    this.props.handleLoginSubmit(this.state);
  };
  handleRegisterLink = async e => {
    e.preventDefault();
    console.log('will pass props up to app.js to trigger displayRegister')
    this.props.setNotRegistered();
  }
  render() {
    return (
      <div className="Login-wrapper">
        <div className="Login-form">
          <img className="Login-logo" width={168} height={168} src={logo_bk} />
          <form onSubmit={this.handleLoginSubmit}>
            <label className="Login-label">
              Username:{" "}
            </label>
            <input className="Login-input" type="text" name="username" onChange={this.handleChange} />
            <label className="Login-label">
              Password:{" "}
            </label>
            <input className="Login-input"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <button className="Login-btn" type="submit">Login</button>
            <label>Not registered? <a href="#" onClick={this.handleRegisterLink}>Click Here</a></label>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
