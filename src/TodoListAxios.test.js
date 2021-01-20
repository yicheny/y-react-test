import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

//通过 jest.mock 配置 axios 模块的 Mock（确保要在 import TodoList 之前）
// jest.mock('axios');

import TodoListAxios from './TodoListAxios';

describe('ToDoList component', () => {
    it('修改流程测试',()=>{
        const getSpy = jest.spyOn(axios, 'get');
        const toDoListInstance = shallow(<TodoListAxios/>);
        expect(getSpy).toBeCalled();

        const newTask = 'new task name';
        const taskInput = toDoListInstance.find('input');
        taskInput.simulate('change', { target: { value: newTask }});

        const postSpy = jest.spyOn(axios, 'post');
        const button = toDoListInstance.find('button');
        button.simulate('click');
        expect(postSpy).toBeCalled();

        const postPromise = postSpy.mock.results.pop().value;

        return postPromise.then((postResponse) => {
            const currentState = toDoListInstance.state();
            expect(currentState.tasks.includes((postResponse.data))).toBe(true);
            expect(currentState.tasks[0].name).toBe('new task name')
        })
    })
});
