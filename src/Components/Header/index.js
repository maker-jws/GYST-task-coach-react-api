import React from "react";
import EditTask from '../EditTask/index';
// import Login from '../Login/index'
// import Register from '../Register/index'
// import Profile from '../Profile/index'
// import { Link } from 'react-router-dom'
// import { Button, Form, Grid, Image, Message, Card, Icon } from 'semantic-ui-react';


function Header() {
  const headerStyle = {
  
  }
  // const logoutStyle = {
  // display: "block",
  // justifyContent: "right"
  // }
  return (
    <div style={headerStyle} className="ui inverted segment">
      <div className="ui inverted secondary menu">
        <a className="active item" href="#">LOGO</a>
        <a className="item">Add Task</a>
        <a className="item" href="/user/logout">
          Logout
        </a>
      </div>
    </div>
  );
}
export default Header;


        // <a className="item" displayEditModal={this.displayEditModal}>
        //   Add Task
        // </a>



     


// <button className="mini ui button" onClick={this.props.displayEditModal.bind(null, task)}>Edit</button>






















