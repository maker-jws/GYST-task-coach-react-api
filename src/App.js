import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { Route, Switch } from 'react-router-dom';
import TaskContainer from './Components/TaskContainer/index'
import Header from './Components/Header/index';

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
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        username: "",
        login: "",
        logout: ""
      },
      currentTime: new Date().toLocaleString()
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <TaskContainer />
      </div>
    );
  }
}


export default App;

// not using switch until all functionality is in place -- then drop into routes. 