import React from 'react';
import Login from '../Login/index'
import Register from '../Register/index'
import Profile from '../Profile/index'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Image, Message, Card, Icon} from 'semantic-ui-react';

function Header() {
    return (

<div class="ui inverted segment">
  <div class="ui inverted secondary menu">
    <a class="active item">
      Home
    </a>
    <a class="item">
      Add Task
    </a>
    <a class="item">
      Logout
    </a>
  </div>
</div>
)
}
export default Header;