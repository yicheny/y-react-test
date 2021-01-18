import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('app component', () => {
    it('contains a header with the "Hello world!"', () => {
        const app = shallow(<App />);//用 shallow 函数来浅层渲染 App 组件得到 app
        expect(app.containsMatchingElement(<h1>Hello world!</h1>)).toEqual(true);//调用 containsMatchingElement 来判断渲染后的 App 组件是否包含 <h1>Hello world!</h1> 元素
    });
});
