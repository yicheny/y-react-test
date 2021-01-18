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

    //快照测试是 Jest 的一大招牌功能。所谓快照，可以简单地理解成是我们应用的一个**“代码截图”**。当我们运行快照测试时，Jest 将会渲染组件并创建其快照文件。这个快照文件包含渲染后组件的整个结构，并且应该与测试文件本身一起提交到代码库。当我们再次运行快照测试时，Jest 会将新的快照与旧的快照进行比较，如果两者不一致，测试就会失败，从而帮助我们确保用户界面不会发生意外改变。
    //如果我们要对 ToDoList 组件进行任何更改，快照测试就会失败，并且显示当前渲染结果与快照之间的精确差异。如果我们要更新所有失败的快照，可以使用 -u 标志(别名为 --updateSnapshot) 来运行 Jest。输入以下命令，一键更新所有快照：
    //npm test -- -u
    describe('快照测试', () => {
        it('should render correctly', () => {
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

            const toDoListInstance = shallow(
                <ToDoList tasks={tasks}/>
            );

            expect(toDoListInstance).toMatchSnapshot();
        });
    });
});
