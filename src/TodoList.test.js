import React from 'react';
import { shallow,mount } from 'enzyme';

import ToDoList from './ToDoList';

describe('ToDoList component', () => {
    describe('when provided with an empty array of tasks', () => {
        it('contains an empty <ul> element', () => {
            const toDoList = shallow(<ToDoList tasks={[]} />);
            expect(toDoList).toContainReact(<ul />);
        });

        it('does not contain any <li> elements', () => {
            const toDoList = shallow(<ToDoList tasks={[]} />);
            expect(toDoList.find('li').length).toEqual(0);
        });
    });

    describe('when provided with an array of tasks', () => {
        it('passes them to the Task components', () => {
            const tasks = [
                {
                    id: 0,
                    name: 'Wash the dishes'
                },
                {
                    id: 1,
                    name: 'Make the bed'
                }
            ];

            const toDoListInstance = shallow(<ToDoList tasks={tasks}/>);

            toDoListInstance.find('Task').forEach(taskInstance => {
                const taskProps = taskInstance.props();
                const matchingTask = tasks.find(task => task.id === taskProps.id);
                expect(taskProps.name).toBe(matchingTask.name);
            })
        })
    });

    //由于 mount 函数会模拟实际的 DOM，渲染成本更高，因此运行测试会花费更多的时间。通常我们会在集成测试中使用 mount 函数，测试组件之间如何协同工作，而不仅仅是作为独立的单元。
    //在测试与 DOM 的交互或者在处理高阶组件时，mount 函数也可以派上用场。mount 使用 DOM 实现的模拟，Jest 默认使用的是 jsdom。我们可以通过调整 testEnvironment 属性更改
    describe('完全渲染测试',()=>{
        it('测试li的渲染结果与原始props进行对比',()=>{
            const tasks = [
                {id: 0, name: 'Wash the dishes'},
                {id: 1, name: 'Make the bed'}
            ];

            const toDoListInstance = mount(<ToDoList tasks={tasks}/>);
            toDoListInstance.find('Task').forEach(taskInstance => {
                const taskProps = taskInstance.props();
                const matchingTask = tasks.find(task => task.id === taskProps.id);
                const listItem = taskInstance.first('li');
                expect(listItem.text()).toBe(matchingTask.name);
            });
        })
    })
});
