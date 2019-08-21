import React from 'react';
// import Login from '../Login/index'
// import Register from '../Register/index'
// import Profile from '../Profile/index'
// import { Link } from 'react-router-dom'
// import { Button, Form, Grid, Image, Message, Card, Icon } from 'semantic-ui-react';

function Header() {
    return (

        <div className="ui inverted segment">
            <div className="ui inverted secondary menu">
                <a className="active item">
                    Home
    </a>
                <a className="item">
                    Add Task
    </a>
                <a className="item">
                    Logout
    </a>
            </div>
        </div>
    )
}
export default Header;