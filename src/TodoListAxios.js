import React, { Component } from 'react';
import axios from 'axios';

import Task from './Task';

const apiUrl = 'https://api.tuture.co';

class ToDoList extends Component {
    state = {
        tasks: [],
    };

    componentDidMount() {
        return axios
            .get(`${apiUrl}/tasks`)
            .then((tasksResponse) => {
                this.setState({ tasks: tasksResponse.data });
            })
            .catch((error) => console.log(error));
    }

    render() {
        return <div>
            <p>测试快照更新</p>
            <ul>
                {this.state.tasks.map((task) => (
                    <Task key={task.id} id={task.id} name={task.name} />
                ))}
            </ul>
        </div>
    }
}

export default ToDoList;