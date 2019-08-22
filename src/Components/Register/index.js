import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: ""
        };
    }
    handleRegSubmit = (e) => {
        e.preventDefault();
        return this.props.registerSubmit(this.state)

    }
    handleChange = e => {
        console.log(this.state)
        this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    };

    render() {
        return (
            <Form onSubmit={this.handleRegSubmit} id="main-form">
                <label>
                    Create Username:
         <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    Create Email:
         <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    Create Password:
         <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={this.handleChange}
                    />
                </label>
                <button type="Submit" className="ui primary button" id="button">
                    Register
       </button>
            </Form>
        );
    }
}
export default Register;