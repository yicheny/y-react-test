import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

//通过 jest.mock 配置 axios 模块的 Mock（确保要在 import TodoList 之前）
jest.mock('axios');

import TodoListAxios from './TodoListAxios';

describe('ToDoList component', () => {
    describe('when rendered', () => {
        it('should fetch a list of tasks', () => {
            const getSpy = jest.spyOn(axios, 'get');//通过 jest.spyOn，我们便可以监听一个函数的使用情况
            const todoListAxios = shallow(<TodoListAxios />);//使用配套的 toBeCalled Matcher 来判断该函数是否被调用。
            expect(getSpy).toBeCalled();
            expect(todoListAxios).toMatchSnapshot();
        });
    });
});
