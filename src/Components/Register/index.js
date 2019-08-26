import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import logo from "../../img/logo_org.png";
class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: ""
        };
    };
    handleRegSubmit = e => {
        e.preventDefault();
        return this.props.registerSubmit(this.state)
    };
    handleChange = e => {
        // console.log(this.state)
        this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  };   
  render() {
        return (
            <div className="Register-wrapper">

                <div className="Register-form">
                    <Form onSubmit={this.handleRegSubmit} id="main-form">
                        <div className="Register-masthead">
                            <img className="Register-logo" src={logo} width={96} height={96} alt="GYST Logo" />
                            <h5><label>Ready to...</label><br /><em>Get Your _________ Together?</em></h5>
                        </div>

                        <label className="Register-label">Create Username:</label>
                        <input className="Register-input"
                            type="text"
                            name="username"
                            id="username"
                            onChange={this.handleChange}
                        />
                        <label className="Register-label">Create Email:</label>
                        <input className="Register-input"
                            type="email"
                            name="email"
                            id="email"
                            onChange={this.handleChange}
                        />
                        <label className="Register-label">Create Password:</label>
                        <input className="Register-input"
                            type="password"
                            name="password"
                            id="password"
                            onChange={this.handleChange}
                        />
                        <button type="Submit" className="Register-btn">
                            Register</button>
                    </Form>
                </div>
            </div>
  }
}
export default Register;
