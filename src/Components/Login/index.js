import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.username, ' tried to login')
        this.props.handleLoginSubmit(this.state)
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleLoginSubmit}>
                    <label>
                        Username:{" "}
                        <input type="text" name="username" onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:{" "}
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                        />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}
export default Login;