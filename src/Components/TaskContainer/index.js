import React, { Component } from 'react';
import CreateTask from '../CreateTask/index';
// import MovieList from '../MovieList/index'
// import EditMovie from '../EditMovie/index'


class TaskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <main>
                <h1>This is the Task Container</h1>
                <CreateTask />
            </main>
        );
    }
}

export default TaskContainer;